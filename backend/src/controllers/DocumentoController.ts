import { Request, Response } from 'express';
import { DocumentoService } from '../services/DocumentoService';

const documentoService = new DocumentoService();

export const listar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const documentos = await documentoService.buscarPorFamiliaId(familyId);
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar documentos' });
  }
};

export const enviar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const arquivo = req.file;

    if (!arquivo) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const documento = await documentoService.enviar(familyId, arquivo);
    res.status(201).json(documento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar documento' });
  }
};

export const obter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const documento = await documentoService.buscarPorId(id);
    
    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    res.json(documento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar documento' });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const documento = await documentoService.buscarPorId(id);
    
    if (!documento) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    await documentoService.deletar(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar documento' });
  }
}; 