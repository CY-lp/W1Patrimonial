import api from './api';

export const ativoService = {
  listar: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/ativos`);
    return response.data;
  },

  criar: async (familyId: string, data: any) => {
    const response = await api.post(`/familias/${familyId}/ativos`, data);
    return response.data;
  },

  obter: async (familyId: string, id: string) => {
    const response = await api.get(`/familias/${familyId}/ativos/${id}`);
    return response.data;
  },

  atualizar: async (familyId: string, id: string, data: any) => {
    const response = await api.put(`/familias/${familyId}/ativos/${id}`, data);
    return response.data;
  },

  remover: async (familyId: string, id: string) => {
    await api.delete(`/familias/${familyId}/ativos/${id}`);
  },

  buscarPorTipo: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/ativos/por-tipo`);
    return response.data;
  }
}; 