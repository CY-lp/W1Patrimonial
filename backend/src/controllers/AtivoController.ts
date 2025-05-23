import { Request, Response } from 'express';
import { AtivoService } from '../services/AtivoService';

const ativoService = new AtivoService();

export const listar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const ativos = await ativoService.buscarPorFamiliaId(familyId);
    res.json(ativos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar ativos' });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const data = {
      ...req.body,
      family_id: familyId
    };
    const ativo = await ativoService.criar(data);
    res.status(201).json(ativo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ativo' });
  }
};

export const obter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ativo = await ativoService.buscarPorId(id);
    
    if (!ativo) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    res.json(ativo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ativo' });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ativo = await ativoService.buscarPorId(id);
    
    if (!ativo) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    const ativoAtualizado = await ativoService.atualizar(id, req.body);
    res.json(ativoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ativo' });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ativo = await ativoService.buscarPorId(id);
    
    if (!ativo) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    await ativoService.deletar(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar ativo' });
  }
}; 