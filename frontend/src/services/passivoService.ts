import api from './api';

export const passivoService = {
  listar: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/passivos`);
    return response.data;
  },

  criar: async (familyId: string, data: any) => {
    const response = await api.post(`/familias/${familyId}/passivos`, data);
    return response.data;
  },

  obter: async (familyId: string, id: string) => {
    const response = await api.get(`/familias/${familyId}/passivos/${id}`);
    return response.data;
  },

  atualizar: async (familyId: string, id: string, data: any) => {
    const response = await api.put(`/familias/${familyId}/passivos/${id}`, data);
    return response.data;
  },

  remover: async (familyId: string, id: string) => {
    await api.delete(`/familias/${familyId}/passivos/${id}`);
  },

  buscarPorTipo: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/passivos/por-tipo`);
    return response.data;
  }
}; 