import { Router } from 'express';
import { auth } from '../middlewares/auth';
import * as AuthController from '../controllers/AuthController';
import * as FamilyController from '../controllers/FamilyController';
import * as AssetController from '../controllers/AssetController';
import * as LiabilityController from '../controllers/LiabilityController';
import * as TransactionController from '../controllers/TransactionController';
import * as DocumentController from '../controllers/DocumentController';
import * as InviteController from '../controllers/InviteController';

const router = Router();

// Rotas públicas
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Middleware de autenticação para rotas protegidas
router.use(auth);

// Família
router.get('/families', FamilyController.list);
router.post('/families', FamilyController.create);
router.get('/families/:id', FamilyController.get);
router.put('/families/:id', FamilyController.update);
router.delete('/families/:id', FamilyController.remove);

// Membros da Família
router.get('/families/:familyId/members', FamilyController.listMembers);
router.post('/families/:familyId/members', FamilyController.addMember);
router.put('/families/:familyId/members/:id', FamilyController.updateMember);
router.delete('/families/:familyId/members/:id', FamilyController.removeMember);

// Ativos
router.get('/families/:familyId/assets', AssetController.list);
router.post('/families/:familyId/assets', AssetController.create);
router.get('/families/:familyId/assets/:id', AssetController.get);
router.put('/families/:familyId/assets/:id', AssetController.update);
router.delete('/families/:familyId/assets/:id', AssetController.remove);

// Passivos
router.get('/families/:familyId/liabilities', LiabilityController.list);
router.post('/families/:familyId/liabilities', LiabilityController.create);
router.get('/families/:familyId/liabilities/:id', LiabilityController.get);
router.put('/families/:familyId/liabilities/:id', LiabilityController.update);
router.delete('/families/:familyId/liabilities/:id', LiabilityController.remove);

// Transações
router.get('/families/:familyId/transactions', TransactionController.list);
router.post('/families/:familyId/transactions', TransactionController.create);
router.get('/families/:familyId/transactions/:id', TransactionController.get);
router.put('/families/:familyId/transactions/:id', TransactionController.update);
router.delete('/families/:familyId/transactions/:id', TransactionController.remove);

// Documentos
router.get('/families/:familyId/documents', DocumentController.list);
router.post('/families/:familyId/documents', DocumentController.upload);
router.get('/families/:familyId/documents/:id', DocumentController.get);
router.delete('/families/:familyId/documents/:id', DocumentController.remove);

// Convites
router.get('/families/:familyId/invites', InviteController.list);
router.post('/families/:familyId/invites', InviteController.create);
router.get('/families/:familyId/invites/:id', InviteController.get);
router.put('/families/:familyId/invites/:id', InviteController.update);
router.delete('/families/:familyId/invites/:id', InviteController.remove);

// Dashboard
router.get('/families/:familyId/dashboard', async (req, res) => {
  try {
    const { familyId } = req.params;
    const [familia, ativos, passivos, transacoes] = await Promise.all([
      prisma.family.findUnique({
        where: { id: familyId },
        include: {
          dono: true,
          consultor: true
        }
      }),
      prisma.asset.findMany({ where: { family_id: familyId } }),
      prisma.liability.findMany({ where: { family_id: familyId } }),
      prisma.transaction.findMany({
        where: { family_id: familyId },
        orderBy: { data: 'desc' },
        take: 5
      })
    ]);

    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    const total_ativos = ativos.reduce((sum, ativo) => sum + Number(ativo.valor), 0);
    const total_passivos = passivos.reduce((sum, passivo) => sum + Number(passivo.valor), 0);
    const patrimonio_liquido = total_ativos - total_passivos;

    res.json({
      patrimonio_liquido,
      total_ativos,
      total_passivos,
      ativos,
      passivos,
      transacoes_recentes: transacoes,
      familia
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dashboard' });
  }
});

export default router; 