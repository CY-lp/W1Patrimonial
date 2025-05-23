import prisma from './prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AutenticacaoService {
  private gerarToken(userId: string, tipo: string) {
    return jwt.sign(
      { id: userId, tipo },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
  }

  async login(email: string, senha: string) {
    const usuario = await prisma.user.findUnique({
      where: { email }
    });

    if (!usuario || !usuario.ativo) {
      return null;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return null;
    }

    const token = this.gerarToken(usuario.id, usuario.tipo);
    
    const { senha: _, ...usuarioSemSenha } = usuario;
    return { user: usuarioSemSenha, token };
  }

  async loginGoogle(email: string, nome: string, googleId: string) {
    let usuario = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { googleId }
        ]
      }
    });

    if (!usuario) {
      // Criar novo usuário
      usuario = await prisma.user.create({
        data: {
          nome,
          email,
          googleId,
          tipo: 'CLIENTE',
          ativo: true
        }
      });
    } else if (!usuario.googleId) {
      // Atualizar usuário existente com Google ID
      usuario = await prisma.user.update({
        where: { id: usuario.id },
        data: { googleId }
      });
    }

    const token = this.gerarToken(usuario.id, usuario.tipo);
    
    const { senha: _, ...usuarioSemSenha } = usuario;
    return { user: usuarioSemSenha, token };
  }

  async registro(nome: string, email: string, senha: string) {
    const hashSenha = await bcrypt.hash(senha, 10);

    const usuario = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashSenha,
        tipo: 'CLIENTE',
        ativo: true
      }
    });

    const token = this.gerarToken(usuario.id, usuario.tipo);
    
    const { senha: _, ...usuarioSemSenha } = usuario;
    return { user: usuarioSemSenha, token };
  }

  async buscarPorEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async buscarPorId(id: string) {
    const usuario = await prisma.user.findUnique({
      where: { id }
    });

    if (!usuario) return null;

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async atualizarPerfil(userId: string, data: { nome?: string; email?: string }) {
    const usuario = await prisma.user.update({
      where: { id: userId },
      data
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async alterarSenha(userId: string, senhaAtual: string, novaSenha: string) {
    const usuario = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!usuario) return false;

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) return false;

    const hashSenha = await bcrypt.hash(novaSenha, 10);
    
    await prisma.user.update({
      where: { id: userId },
      data: { senha: hashSenha }
    });

    return true;
  }
} 