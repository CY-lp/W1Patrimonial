import api from './api';

interface FiltrosTransacao {
  dataInicio?: Date;
  dataFim?: Date;
  tipo?: string;
  categoria?: string;
}

export const transacaoService = {
  listar: async (familyId: string, filtros?: FiltrosTransacao) => {
    const params = new URLSearchParams();
    if (filtros?.dataInicio) params.append('startDate', filtros.dataInicio.toISOString());
    if (filtros?.dataFim) params.append('endDate', filtros.dataFim.toISOString());
    if (filtros?.tipo) params.append('tipo', filtros.tipo);
    if (filtros?.categoria) params.append('categoria', filtros.categoria);

    const response = await api.get(`/familias/${familyId}/transacoes`, { params });
    return response.data;
  },

  criar: async (familyId: string, data: any) => {
    const response = await api.post(`/familias/${familyId}/transacoes`, data);
    return response.data;
  },

  obter: async (familyId: string, id: string) => {
    const response = await api.get(`/familias/${familyId}/transacoes/${id}`);
    return response.data;
  },

  atualizar: async (familyId: string, id: string, data: any) => {
    const response = await api.put(`/familias/${familyId}/transacoes/${id}`, data);
    return response.data;
  },

  remover: async (familyId: string, id: string) => {
    await api.delete(`/familias/${familyId}/transacoes/${id}`);
  },

  obterResumo: async (familyId: string, dataInicio: Date, dataFim: Date) => {
    const params = new URLSearchParams({
      startDate: dataInicio.toISOString(),
      endDate: dataFim.toISOString()
    });

    const response = await api.get(`/familias/${familyId}/transacoes/resumo`, { params });
    return response.data;
  }
}; 