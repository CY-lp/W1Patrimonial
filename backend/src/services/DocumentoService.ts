import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export class DocumentoService {
  async criar(data: Prisma.DocumentCreateInput) {
    const documentData = { ...data };
    if (!documentData.url) {
    }
    return prisma.document.create({ data: documentData });
  }

  async buscarPorId(id: string) {
    return prisma.document.findUnique({
      where: { id },
      include: {
        familia: true,
      },
    });
  }

  async buscarPorFamiliaId(familyId: string) {
    return prisma.document.findMany({
      where: { family_id: familyId },
      orderBy: { criado_em: "desc" },
    });
  }

  async enviar(familyId: string, arquivo: Express.Multer.File) {
    return this.criar({
      family_id: familyId,
      nome: arquivo.originalname,
      tipo: arquivo.mimetype,
      tamanho: arquivo.size,
      url: `placeholder_local_path/${arquivo.originalname}`,
    });
  }

  async deletar(id: string) {
    const documento = await this.buscarPorId(id);

    if (documento) {
      return prisma.document.delete({
        where: { id },
      });
    }
    return null;
  }
}
