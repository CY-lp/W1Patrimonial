import prisma from './prisma';
import { Prisma } from '@prisma/client';
import { enviarEmail } from '../utils/email';

export class ConviteService {
  async criar(data: Prisma.InviteCreateInput) {
    const convite = await prisma.invite.create({ data });
    
    await enviarEmail({
      para: convite.email,
      assunto: 'Convite para participar da família',
      texto: `Você foi convidado para participar da família. Clique no link para aceitar: ${process.env.FRONTEND_URL}/convites/${convite.id}`
    });

    return convite;
  }

  async buscarPorId(id: string) {
    return prisma.invite.findUnique({
      where: { id },
      include: {
        familia: true
      }
    });
  }

  async buscarPorFamiliaId(familyId: string) {
    return prisma.invite.findMany({
      where: { family_id: familyId },
      orderBy: { criado_em: 'desc' }
    });
  }

  async atualizar(id: string, data: Prisma.InviteUpdateInput) {
    return prisma.invite.update({
      where: { id },
      data
    });
  }

  async deletar(id: string) {
    return prisma.invite.delete({
      where: { id }
    });
  }

  async aceitar(id: string, userId: string) {
    const convite = await this.buscarPorId(id);
    
    if (!convite) {
      throw new Error('Convite não encontrado');
    }

    if (convite.status !== 'PENDENTE') {
      throw new Error('Convite já foi processado');
    }

    await prisma.$transaction([
      prisma.familyMember.create({
        data: {
          family_id: convite.family_id,
          user_id: userId,
          tipo: convite.tipo
        }
      }),
      prisma.invite.update({
        where: { id },
        data: { status: 'ACEITO' }
      })
    ]);

    return convite;
  }

  async rejeitar(id: string) {
    const convite = await this.buscarPorId(id);
    
    if (!convite) {
      throw new Error('Convite não encontrado');
    }

    if (convite.status !== 'PENDENTE') {
      throw new Error('Convite já foi processado');
    }

    return prisma.invite.update({
      where: { id },
      data: { status: 'REJEITADO' }
    });
  }
} 