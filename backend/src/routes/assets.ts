import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const assetSchema = z.object({
  name: z.string().min(1),
  value: z.number().positive(),
  type: z.string().min(1),
});

// Listar ativos do usuário
router.get('/', async (req, res) => {
  try {
    const assets = await prisma.asset.findMany({
      where: { userId: req.userId },
    });
    return res.json(assets);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar ativos' });
  }
});

// Criar novo ativo
router.post('/', async (req, res) => {
  try {
    const data = assetSchema.parse(req.body);
    
    const asset = await prisma.asset.create({
      data: {
        ...data,
        userId: req.userId!,
      },
    });

    return res.status(201).json(asset);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Erro ao criar ativo' });
  }
});

// Atualizar ativo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = assetSchema.parse(req.body);

    const asset = await prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    if (asset.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data,
    });

    return res.json(updatedAsset);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Erro ao atualizar ativo' });
  }
});

// Deletar ativo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    if (asset.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    await prisma.asset.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar ativo' });
  }
});

export const assetsRouter = router; 