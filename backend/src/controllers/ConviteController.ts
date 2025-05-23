import { Request, Response } from 'express';
import { ConviteService } from '../services/ConviteService';

const conviteService = new ConviteService();

export const listar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const convites = await conviteService.buscarPorFamiliaId(familyId);
    res.json(convites);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar convites' });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const { email, tipo } = req.body;
    
    const convite = await conviteService.criar({
      family_id: familyId,
      email,
      tipo
    });
    
    res.status(201).json(convite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Erro ao criar convite: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao criar convite' });
    }
  }
};

export const obter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convite = await conviteService.buscarPorId(id);
    
    if (!convite) {
      return res.status(404).json({ error: 'Convite não encontrado' });
    }

    res.json(convite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Erro ao buscar convite: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao buscar convite' });
    }
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convite = await conviteService.buscarPorId(id);
    
    if (!convite) {
      return res.status(404).json({ error: 'Convite não encontrado' });
    }

    const conviteAtualizado = await conviteService.atualizar(id, req.body);
    res.json(conviteAtualizado);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Erro ao atualizar convite: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao atualizar convite' });
    }
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convite = await conviteService.buscarPorId(id);
    
    if (!convite) {
      return res.status(404).json({ error: 'Convite não encontrado' });
    }

    await conviteService.deletar(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Erro ao deletar convite: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao deletar convite' });
    }
  }
};

export const aceitar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id; 
    const convite = await conviteService.aceitar(id, userId);
    res.json(convite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro ao aceitar convite' });
    }
  }
};

export const rejeitar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convite = await conviteService.rejeitar(id);
    res.json(convite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro ao rejeitar convite' });
    }
  }
};