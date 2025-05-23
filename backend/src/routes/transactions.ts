import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const transactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  amount: z.number().positive(),
  description: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
});

// Listar transações do usuário
router.get('/', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { date: 'desc' },
    });
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

// Criar nova transação
router.post('/', async (req, res) => {
  try {
    const data = transactionSchema.parse(req.body);
    
    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        userId: req.userId!,
      },
    });

    return res.status(201).json(transaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Erro ao criar transação' });
  }
});

// Atualizar transação
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = transactionSchema.parse(req.body);

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    if (transaction.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data,
    });

    return res.json(updatedTransaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
});

// Deletar transação
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    if (transaction.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar transação' });
  }
});

// Buscar transações por período
router.get('/period', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Datas inicial e final são obrigatórias' });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
        date: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      },
      orderBy: { date: 'desc' },
    });

    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

export const transactionsRouter = router; 