import prisma from './prisma';
import { Prisma } from '@prisma/client';

export class PassivoService {
  async criar(data: Prisma.LiabilityCreateInput) {
    return prisma.liability.create({ data });
  }

  async buscarPorId(id: string) {
    return prisma.liability.findUnique({
      where: { id },
      include: {
        familia: true
      }
    });
  }

  async buscarPorFamiliaId(familyId: string) {
    return prisma.liability.findMany({
      where: { family_id: familyId },
      orderBy: [
        { tipo: 'asc' },
        { valor: 'desc' }
      ]
    });
  }

  async atualizar(id: string, data: Prisma.LiabilityUpdateInput) {
    return prisma.liability.update({
      where: { id },
      data
    });
  }

  async deletar(id: string) {
    return prisma.liability.delete({
      where: { id }
    });
  }

  async buscarPorTipo(familyId: string) {
    const passivos = await prisma.liability.groupBy({
      by: ['tipo'],
      where: { family_id: familyId },
      _sum: {
        valor: true
      }
    });

    return passivos.map(passivo => ({
      tipo: passivo.tipo,
      total: passivo._sum.valor || 0
    }));
  }
} 