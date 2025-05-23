import prisma from './prisma';
import { Prisma } from '@prisma/client';

export class AtivoService {
  async criar(data: Prisma.AssetCreateInput) {
    return prisma.asset.create({ data });
  }

  async buscarPorId(id: string) {
    return prisma.asset.findUnique({
      where: { id },
      include: {
        familia: true
      }
    });
  }

  async buscarPorFamiliaId(familyId: string) {
    return prisma.asset.findMany({
      where: { family_id: familyId },
      orderBy: [
        { tipo: 'asc' },
        { valor: 'desc' }
      ]
    });
  }

  async atualizar(id: string, data: Prisma.AssetUpdateInput) {
    return prisma.asset.update({
      where: { id },
      data
    });
  }

  async deletar(id: string) {
    return prisma.asset.delete({
      where: { id }
    });
  }

  async buscarPorTipo(familyId: string) {
    const ativos = await prisma.asset.groupBy({
      by: ['tipo'],
      where: { family_id: familyId },
      _sum: {
        valor: true
      }
    });

    return ativos.map(ativo => ({
      tipo: ativo.tipo,
      total: ativo._sum.valor || 0
    }));
  }
} 