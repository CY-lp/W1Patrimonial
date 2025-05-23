import { Request, Response } from 'express';
import { AutenticacaoService } from '../services/AutenticacaoService';
import { validarEmail, validarSenha } from '../utils/validadores';

const autenticacaoService = new AutenticacaoService();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const resultado = await autenticacaoService.login(email, senha);
    
    if (!resultado) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

export const loginGoogle = async (req: Request, res: Response) => {
  try {
    const { email, nome, googleId } = req.body;

    if (!email || !nome || !googleId) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const resultado = await autenticacaoService.loginGoogle(email, nome, googleId);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login com Google' });
  }
};

export const registro = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    if (!validarSenha(senha)) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    const usuarioExistente = await autenticacaoService.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const resultado = await autenticacaoService.registro(nome, email, senha);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
};

export const obterUsuarioAtual = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const usuario = await autenticacaoService.buscarPorId(userId);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

export const atualizarPerfil = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { nome, email } = req.body;

    if (email && !validarEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const resultado = await autenticacaoService.atualizarPerfil(userId, { nome, email });
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

export const alterarSenha = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
    }

    if (!validarSenha(novaSenha)) {
      return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres' });
    }

    const resultado = await autenticacaoService.alterarSenha(userId, senhaAtual, novaSenha);
    
    if (!resultado) {
      return res.status(400).json({ error: 'Senha atual incorreta' });
    }

    res.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alterar senha' });
  }
};