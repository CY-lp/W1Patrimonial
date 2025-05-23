import prisma from './prisma';
import { Prisma } from '@prisma/client';
import { uploadToS3, deleteFromS3 } from '../utils/s3';

export class DocumentoService {
  async criar(data: Prisma.DocumentCreateInput) {
    return prisma.document.create({ data });
  }

  async buscarPorId(id: string) {
    return prisma.document.findUnique({
      where: { id },
      include: {
        familia: true
      }
    });
  }

  async buscarPorFamiliaId(familyId: string) {
    return prisma.document.findMany({
      where: { family_id: familyId },
      orderBy: { criado_em: 'desc' }
    });
  }

  async enviar(familyId: string, arquivo: Express.Multer.File) {
    const url = await uploadToS3(arquivo);

    return this.criar({
      family_id: familyId,
      nome: arquivo.originalname,
      tipo: arquivo.mimetype,
      tamanho: arquivo.size,
      url
    });
  }

  async deletar(id: string) {
    const documento = await this.buscarPorId(id);
    
    if (documento) {
      await deleteFromS3(documento.url);
      return prisma.document.delete({
        where: { id }
      });
    }
  }
} 