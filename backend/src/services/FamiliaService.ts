import prisma from './prisma';
import { Prisma } from '@prisma/client';

export class FamiliaService {
  async criar(data: Prisma.FamilyCreateInput) {
    return prisma.family.create({ data });
  }

  async buscarPorId(id: string) {
    return prisma.family.findUnique({
      where: { id },
      include: {
        dono: true,
        consultor: true,
        membros: true
      }
    });
  }

  async buscarPorUsuarioId(userId: string) {
    return prisma.family.findMany({
      where: {
        OR: [
          { user_id: userId },
          { consultor_id: userId }
        ]
      },
      include: {
        dono: true,
        consultor: true,
        membros: true
      }
    });
  }

  async atualizar(id: string, data: Prisma.FamilyUpdateInput) {
    return prisma.family.update({
      where: { id },
      data
    });
  }

  async deletar(id: string) {
    return prisma.family.delete({
      where: { id }
    });
  }

  async buscarMembros(familyId: string) {
    return prisma.familyMember.findMany({
      where: { family_id: familyId },
      include: {
        familia: true
      }
    });
  }

  async adicionarMembro(familyId: string, data: Prisma.FamilyMemberCreateInput) {
    return prisma.familyMember.create({
      data: {
        ...data,
        family_id: familyId
      }
    });
  }

  async atualizarMembro(id: string, data: Prisma.FamilyMemberUpdateInput) {
    return prisma.familyMember.update({
      where: { id },
      data
    });
  }

  async removerMembro(id: string) {
    return prisma.familyMember.delete({
      where: { id }
    });
  }

  async obterDashboard(familyId: string) {
    const [familia, ativos, passivos, transacoes] = await Promise.all([
      prisma.family.findUnique({
        where: { id: familyId },
        include: {
          dono: true,
          consultor: true
        }
      }),
      prisma.asset.findMany({ 
        where: { family_id: familyId },
        orderBy: { valor: 'desc' }
      }),
      prisma.liability.findMany({ 
        where: { family_id: familyId },
        orderBy: { valor: 'desc' }
      }),
      prisma.transaction.findMany({
        where: { family_id: familyId },
        orderBy: { data: 'desc' },
        take: 5
      })
    ]);

    if (!familia) {
      throw new Error('Família não encontrada');
    }

    const total_ativos = ativos.reduce((sum, ativo) => sum + Number(ativo.valor), 0);
    const total_passivos = passivos.reduce((sum, passivo) => sum + Number(passivo.valor), 0);
    const patrimonio_liquido = total_ativos - total_passivos;

    return {
      patrimonio_liquido,
      total_ativos,
      total_passivos,
      ativos,
      passivos,
      transacoes_recentes: transacoes,
      familia
    };
  }
} 