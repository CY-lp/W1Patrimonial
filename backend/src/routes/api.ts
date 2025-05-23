import { Router } from 'express';
import { auth } from '../middlewares/auth';
import * as AutenticacaoController from '../controllers/AutenticacaoController';
import * as FamiliaController from '../controllers/FamiliaController';
import * as AtivoController from '../controllers/AtivoController';
import * as PassivoController from '../controllers/PassivoController';
import * as TransacaoController from '../controllers/TransacaoController';
import * as DocumentoController from '../controllers/DocumentoController';
import * as ConviteController from '../controllers/ConviteController';

const router = Router();

// Rotas públicas
router.post('/autenticacao/registrar', AutenticacaoController.registrar);
router.post('/autenticacao/login', AutenticacaoController.login);

// Família
router.get('/familias', auth, FamiliaController.listar);
router.post('/familias', auth, FamiliaController.criar);
router.get('/familias/:id', auth, FamiliaController.obter);
router.put('/familias/:id', auth, FamiliaController.atualizar);
router.delete('/familias/:id', auth, FamiliaController.remover);

// Membros da Família
router.get('/familias/:familyId/membros', auth, FamiliaController.listarMembros);
router.post('/familias/:familyId/membros', auth, FamiliaController.adicionarMembro);
router.put('/familias/:familyId/membros/:id', auth, FamiliaController.atualizarMembro);
router.delete('/familias/:familyId/membros/:id', auth, FamiliaController.removerMembro);

// Ativos
router.get('/familias/:familyId/ativos', auth, AtivoController.listar);
router.post('/familias/:familyId/ativos', auth, AtivoController.criar);
router.get('/familias/:familyId/ativos/:id', auth, AtivoController.obter);
router.put('/familias/:familyId/ativos/:id', auth, AtivoController.atualizar);
router.delete('/familias/:familyId/ativos/:id', auth, AtivoController.remover);

// Passivos
router.get('/familias/:familyId/passivos', auth, PassivoController.listar);
router.post('/familias/:familyId/passivos', auth, PassivoController.criar);
router.get('/familias/:familyId/passivos/:id', auth, PassivoController.obter);
router.put('/familias/:familyId/passivos/:id', auth, PassivoController.atualizar);
router.delete('/familias/:familyId/passivos/:id', auth, PassivoController.remover);

// Transações
router.get('/familias/:familyId/transacoes', auth, TransacaoController.listar);
router.post('/familias/:familyId/transacoes', auth, TransacaoController.criar);
router.get('/familias/:familyId/transacoes/:id', auth, TransacaoController.obter);
router.put('/familias/:familyId/transacoes/:id', auth, TransacaoController.atualizar);
router.delete('/familias/:familyId/transacoes/:id', auth, TransacaoController.remover);

// Documentos
router.get('/familias/:familyId/documentos', auth, DocumentoController.listar);
router.post('/familias/:familyId/documentos', auth, DocumentoController.enviar);
router.get('/familias/:familyId/documentos/:id', auth, DocumentoController.obter);
router.delete('/familias/:familyId/documentos/:id', auth, DocumentoController.remover);

// Convites
router.get('/familias/:familyId/convites', auth, ConviteController.listar);
router.post('/familias/:familyId/convites', auth, ConviteController.criar);
router.get('/familias/:familyId/convites/:id', auth, ConviteController.obter);
router.put('/familias/:familyId/convites/:id', auth, ConviteController.atualizar);
router.delete('/familias/:familyId/convites/:id', auth, ConviteController.remover);

export default router; 