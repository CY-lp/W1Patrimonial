import api from './api';

export const familiaService = {
  listar: async () => {
    const response = await api.get('/familias');
    return response.data;
  },

  criar: async (data: any) => {
    const response = await api.post('/familias', data);
    return response.data;
  },

  obter: async (id: string) => {
    const response = await api.get(`/familias/${id}`);
    return response.data;
  },

  atualizar: async (id: string, data: any) => {
    const response = await api.put(`/familias/${id}`, data);
    return response.data;
  },

  remover: async (id: string) => {
    await api.delete(`/familias/${id}`);
  },

  listarMembros: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/membros`);
    return response.data;
  },

  adicionarMembro: async (familyId: string, data: any) => {
    const response = await api.post(`/familias/${familyId}/membros`, data);
    return response.data;
  },

  atualizarMembro: async (familyId: string, id: string, data: any) => {
    const response = await api.put(`/familias/${familyId}/membros/${id}`, data);
    return response.data;
  },

  removerMembro: async (familyId: string, id: string) => {
    await api.delete(`/familias/${familyId}/membros/${id}`);
  }
}; 