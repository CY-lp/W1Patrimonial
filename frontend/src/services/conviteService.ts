import api from './api';

export const conviteService = {
  listar: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/convites`);
    return response.data;
  },

  criar: async (familyId: string, data: { email: string; tipo: string }) => {
    const response = await api.post(`/familias/${familyId}/convites`, data);
    return response.data;
  },

  obter: async (id: string) => {
    const response = await api.get(`/convites/${id}`); 
    return response.data;
  },

  aceitar: async (id: string) => {
    const response = await api.post(`/convites/${id}/aceitar`);
    return response.data;
  },

  rejeitar: async (id: string) => {
    const response = await api.post(`/convites/${id}/rejeitar`);
    return response.data;
  },

  remover: async (familyId: string, id: string) => {
    await api.delete(`/familias/<span class="math-inline">\{familyId\}/convites/</span>{id}`);
  }
};