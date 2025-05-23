import prisma from './prisma';
import { Prisma } from '@prisma/client';

export class TransacaoService {
  async criar(data: Prisma.TransactionCreateInput) {
    return prisma.transaction.create({ data });
  }

  async buscarPorId(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        familia: true
      }
    });
  }

  async buscarPorFamiliaId(familyId: string, filtros?: {
    dataInicio?: Date;
    dataFim?: Date;
    tipo?: string;
    categoria?: string;
  }) {
    const where: Prisma.TransactionWhereInput = {
      family_id: familyId,
      ...(filtros?.dataInicio && filtros?.dataFim && {
        data: {
          gte: filtros.dataInicio,
          lte: filtros.dataFim
        }
      }),
      ...(filtros?.tipo && { tipo: filtros.tipo as Prisma.TransactionType }),
      ...(filtros?.categoria && { categoria: filtros.categoria })
    };

    return prisma.transaction.findMany({
      where,
      orderBy: { data: 'desc' }
    });
  }

  async atualizar(id: string, data: Prisma.TransactionUpdateInput) {
    return prisma.transaction.update({
      where: { id },
      data
    });
  }

  async deletar(id: string) {
    return prisma.transaction.delete({
      where: { id }
    });
  }

  async obterResumo(familyId: string, dataInicio: Date, dataFim: Date) {
    const transacoes = await prisma.transaction.groupBy({
      by: ['tipo', 'categoria'],
      where: {
        family_id: familyId,
        data: {
          gte: dataInicio,
          lte: dataFim
        }
      },
      _sum: {
        valor: true
      }
    });

    const resumo = {
      receitas: 0,
      despesas: 0,
      por_categoria: transacoes.map(t => ({
        tipo: t.tipo,
        categoria: t.categoria,
        total: t._sum.valor || 0
      }))
    };

    transacoes.forEach(t => {
      if (t.tipo === 'RECEITA') {
        resumo.receitas += Number(t._sum.valor || 0);
      } else if (t.tipo === 'DESPESA') {
        resumo.despesas += Number(t._sum.valor || 0);
      }
    });

    return resumo;
  }
} 