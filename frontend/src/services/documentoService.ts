import api from './api';

export const documentoService = {
  listar: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/documentos`);
    return response.data;
  },

  enviar: async (familyId: string, arquivo: File) => {
    const formData = new FormData();
    formData.append('arquivo', arquivo);

    const response = await api.post(`/familias/${familyId}/documentos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  obter: async (familyId: string, id: string) => {
    const response = await api.get(`/familias/${familyId}/documentos/${id}`);
    return response.data;
  },

  remover: async (familyId: string, id: string) => {
    await api.delete(`/familias/${familyId}/documentos/${id}`);
  }
}; 