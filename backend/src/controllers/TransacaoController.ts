import { Request, Response } from 'express';
import { TransacaoService } from '../services/TransacaoService';

const transacaoService = new TransacaoService();

export const listar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const { startDate, endDate, tipo, categoria } = req.query;
    
    const transacoes = await transacaoService.buscarPorFamiliaId(familyId, {
      dataInicio: startDate ? new Date(startDate as string) : undefined,
      dataFim: endDate ? new Date(endDate as string) : undefined,
      tipo: tipo as string,
      categoria: categoria as string
    });
    
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar transações' });
  }
};

export const criar = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const data = {
      ...req.body,
      family_id: familyId
    };
    const transacao = await transacaoService.criar(data);
    res.status(201).json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

export const obter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transacao = await transacaoService.buscarPorId(id);
    
    if (!transacao) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    res.json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transação' });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transacao = await transacaoService.buscarPorId(id);
    
    if (!transacao) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    const transacaoAtualizada = await transacaoService.atualizar(id, req.body);
    res.json(transacaoAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
};

export const remover = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transacao = await transacaoService.buscarPorId(id);
    
    if (!transacao) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    await transacaoService.deletar(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
}; 