import { Request, Response } from 'express';
import { PassivoService } from '../services/PassivoService';

const passivoService = new PassivoService();

export const listar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const passivos = await passivoService.buscarPorFamiliaId(familyId);
    res.json(passivos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar passivos' });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const data = {
      ...req.body,
      family_id: familyId
    };
    const passivo = await passivoService.criar(data);
    res.status(201).json(passivo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar passivo' });
  }
};

export const obter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const passivo = await passivoService.buscarPorId(id);
    
    if (!passivo) {
      return res.status(404).json({ error: 'Passivo não encontrado' });
    }

    res.json(passivo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar passivo' });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const passivo = await passivoService.buscarPorId(id);
    
    if (!passivo) {
      return res.status(404).json({ error: 'Passivo não encontrado' });
    }

    const passivoAtualizado = await passivoService.atualizar(id, req.body);
    res.json(passivoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar passivo' });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const passivo = await passivoService.buscarPorId(id);
    
    if (!passivo) {
      return res.status(404).json({ error: 'Passivo não encontrado' });
    }

    await passivoService.deletar(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar passivo' });
  }
}; 