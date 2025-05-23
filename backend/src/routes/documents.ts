import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { uploadToS3, deleteFromS3 } from '../services/s3';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// Listar documentos do usuário
router.get('/', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: req.userId },
    });
    return res.json(documents);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar documentos' });
  }
});

// Upload de documento
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const url = await uploadToS3(req.file, req.userId!);
    
    const document = await prisma.document.create({
      data: {
        name: req.file.originalname,
        url,
        type: req.file.mimetype,
        userId: req.userId!,
      },
    });

    return res.status(201).json(document);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer upload do documento' });
  }
});

// Deletar documento
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    if (document.userId !== req.userId) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    await deleteFromS3(document.url);
    
    await prisma.document.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar documento' });
  }
});

export const documentsRouter = router; 