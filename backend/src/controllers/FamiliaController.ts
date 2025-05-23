import { Request, Response } from 'express';
import { FamiliaService } from '../services/FamiliaService';

const familiaService = new FamiliaService();

export const listar = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const familias = await familiaService.buscarPorUsuarioId(userId);
    res.json(familias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar famílias' });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const data = {
      ...req.body,
      user_id: userId
    };
    const familia = await familiaService.criar(data);
    res.status(201).json(familia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar família' });
  }
};

export const obter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const familia = await familiaService.buscarPorId(id);
    
    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    if (familia.user_id !== req.user.id && familia.consultor_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(familia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar família' });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const familia = await familiaService.buscarPorId(id);
    
    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    if (familia.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const familiaAtualizada = await familiaService.atualizar(id, req.body);
    res.json(familiaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar família' });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const familia = await familiaService.buscarPorId(id);
    
    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    if (familia.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await familiaService.deletar(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar família' });
  }
};

export const listarMembros = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const familia = await familiaService.buscarPorId(familyId);
    
    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    if (familia.user_id !== req.user.id && familia.consultor_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const membros = await familiaService.buscarMembros(familyId);
    res.json(membros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar membros' });
  }
};

export const adicionarMembro = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const familia = await familiaService.buscarPorId(familyId);
    
    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    if (familia.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const membro = await familiaService.adicionarMembro(familyId, req.body);
    res.status(201).json(membro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar membro' });
  }
};

export const atualizarMembro = async (req: Request, res: Response) => {
  try {
    const { familyId, id } = req.params;
    const familia = await familiaService.buscarPorId(familyId);
    
    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    if (familia.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const membroAtualizado = await familiaService.atualizarMembro(id, req.body);
    res.json(membroAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar membro' });
  }
};

export const removerMembro = async (req: Request, res: Response) => {
  try {
    const { familyId, id } = req.params;
    const familia = await familiaService.buscarPorId(familyId);
    
    if (!familia) {
      return res.status(404).json({ error: 'Família não encontrada' });
    }

    if (familia.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await familiaService.removerMembro(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover membro' });
  }
}; 