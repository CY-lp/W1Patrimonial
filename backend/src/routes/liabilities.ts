import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const liabilitySchema = z.object({
  name: z.string().min(1),
  value: z.number().positive(),
  type: z.string().min(1),
});

// Listar passivos do usuário
router.get('/', async (req, res) => {
  try {
    const liabilities = await prisma.liability.findMany({
      where: { userId: req.userId },
    });
    return res.json(liabilities);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar passivos' });
  }
});

// Criar novo passivo
router.post('/', async (req, res) => {
  try {
    const data = liabilitySchema.parse(req.body);
    
    const liability = await prisma.liability.create({
      data: {
        ...data,
        userId: req.userId!,
      },
    });

    return res.status(201).json(liability);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Erro ao criar passivo' });
  }
});

// Atualizar passivo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = liabilitySchema.parse(req.body);

    const liability = await prisma.liability.findUnique({
      where: { id },
    });

    if (!liability) {
      return res.status(404).json({ error: 'Passivo não encontrado' });
    }

    if (liability.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    const updatedLiability = await prisma.liability.update({
      where: { id },
      data,
    });

    return res.json(updatedLiability);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Erro ao atualizar passivo' });
  }
});

// Deletar passivo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const liability = await prisma.liability.findUnique({
      where: { id },
    });

    if (!liability) {
      return res.status(404).json({ error: 'Passivo não encontrado' });
    }

    if (liability.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    await prisma.liability.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar passivo' });
  }
});

export const liabilitiesRouter = router; 