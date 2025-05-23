import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import * as AutenticacaoController from "../controllers/AutenticacaoController";
import * as FamiliaController from "../controllers/FamiliaController";
import * as AtivoController from "../controllers/AtivoController";
import * as PassivoController from "../controllers/PassivoController";
import * as TransacaoController from "../controllers/TransacaoController";
import * as DocumentoController from "../controllers/DocumentoController";
import * as ConviteController from "../controllers/ConviteController";
import prisma from "../services/prisma";

const router = Router();

// --- Autenticação ---
router.post("/autenticacao/registrar", AutenticacaoController.registro);
router.post("/autenticacao/login", AutenticacaoController.login);
router.post("/autenticacao/login/google", AutenticacaoController.loginGoogle);

// Middleware de autenticação para rotas protegidas abaixo
router.use(authMiddleware);

router.get("/autenticacao/me", AutenticacaoController.obterUsuarioAtual);
router.put("/autenticacao/perfil", AutenticacaoController.atualizarPerfil);
router.put("/autenticacao/senha", AutenticacaoController.alterarSenha);

// --- Família ---
router.get("/familias", FamiliaController.listar);
router.post("/familias", FamiliaController.criar);
router.get("/familias/:id", FamiliaController.obter);
router.put("/familias/:id", FamiliaController.atualizar);
router.delete("/familias/:id", FamiliaController.remover);

// --- Membros da Família ---
router.get("/familias/:familyId/membros", FamiliaController.listarMembros);
router.post("/familias/:familyId/membros", FamiliaController.adicionarMembro);
router.put(
  "/familias/:familyId/membros/:id",
  FamiliaController.atualizarMembro
);
router.delete(
  "/familias/:familyId/membros/:id",
  FamiliaController.removerMembro
);

// --- Ativos ---
router.get("/familias/:familyId/ativos", AtivoController.listar);
router.post("/familias/:familyId/ativos", AtivoController.criar);
router.get("/familias/:familyId/ativos/:id", AtivoController.obter);
router.put("/familias/:familyId/ativos/:id", AtivoController.atualizar);
router.delete("/familias/:familyId/ativos/:id", AtivoController.remover);

// --- Passivos ---
router.get("/familias/:familyId/passivos", PassivoController.listar);
router.post("/familias/:familyId/passivos", PassivoController.criar);
router.get("/familias/:familyId/passivos/:id", PassivoController.obter);
router.put("/familias/:familyId/passivos/:id", PassivoController.atualizar);
router.delete("/familias/:familyId/passivos/:id", PassivoController.remover);

// --- Transações ---
router.get("/familias/:familyId/transacoes", TransacaoController.listar);
router.post("/familias/:familyId/transacoes", TransacaoController.criar);
router.get("/familias/:familyId/transacoes/:id", TransacaoController.obter);
router.put("/familias/:familyId/transacoes/:id", TransacaoController.atualizar);
router.delete(
  "/familias/:familyId/transacoes/:id",
  TransacaoController.remover
);

router.get("/familias/:familyId/documentos", DocumentoController.listar);
router.get("/familias/:familyId/documentos/:id", DocumentoController.obter);
router.delete(
  "/familias/:familyId/documentos/:id",
  DocumentoController.remover
);

// --- Convites ---
router.get("/familias/:familyId/convites", ConviteController.listar);
router.post("/familias/:familyId/convites", ConviteController.criar);
router.get("/convites/:id", ConviteController.obter);
router.post("/convites/:id/aceitar", ConviteController.aceitar);
router.post("/convites/:id/rejeitar", ConviteController.rejeitar);
router.delete("/familias/:familyId/convites/:id", ConviteController.remover);

// --- Dashboard ---
router.get("/familias/:familyId/dashboard", async (req, res) => {
  try {
    const { familyId } = req.params;
    const familia = await prisma.family.findUnique({
      where: { id: familyId },
      include: {
        dono: true,
        consultor: true,
      },
    });

    if (!familia) {
      return res.status(404).json({ error: "Família não encontrada" });
    }

    if (
      req.user &&
      familia.dono_id !== req.user.id &&
      familia.consultor_id !== req.user.id
    ) {
      return res
        .status(403)
        .json({ error: "Acesso negado ao dashboard desta família." });
    }

    const ativos = await prisma.asset.findMany({
      where: { family_id: familyId },
    });
    const passivos = await prisma.liability.findMany({
      where: { family_id: familyId },
    });
    const transacoes = await prisma.transaction.findMany({
      where: { family_id: familyId },
      orderBy: { data: "desc" },
      take: 5,
    });

    const total_ativos = ativos.reduce(
      (sum, ativo) => sum + Number(ativo.valor),
      0
    );
    const total_passivos = passivos.reduce(
      (sum, passivo) => sum + Number(passivo.valor),
      0
    );
    const patrimonio_liquido = total_ativos - total_passivos;

    res.json({
      patrimonio_liquido,
      total_ativos,
      total_passivos,
      ativos,
      passivos,
      transacoes_recentes: transacoes,
      familia,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Erro ao carregar dashboard: ${error.message}` });
    } else {
      res
        .status(500)
        .json({ error: "Erro desconhecido ao carregar dashboard" });
    }
  }
});

export default router;
