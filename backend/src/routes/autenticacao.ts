import { Router } from 'express';
import {
  login,
  loginGoogle,
  registro,
  obterUsuarioAtual,
  atualizarPerfil,
  alterarSenha
} from '../controllers/AutenticacaoController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Rotas públicas
router.post('/login', login);
router.post('/login/google', loginGoogle);
router.post('/registro', registro);

// Rotas protegidas
router.use(authMiddleware);
router.get('/me', obterUsuarioAtual);
router.put('/perfil', atualizarPerfil);
router.put('/senha', alterarSenha);

export default router; 