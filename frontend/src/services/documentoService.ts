import api from './api';

export const documentoService = {
  listar: async (familyId: string) => {
    const response = await api.get(`/familias/${familyId}/documentos`);
    return response.data;
  },

  enviar: async (familyId: string, arquivo: File | any /* Adjusted type */) => {
    if (!(arquivo instanceof File)) {
        // Assuming 'arquivo' is now an object with metadata
        const response = await api.post(`/familias/${familyId}/documentos`, arquivo);
        return response.data;
    }

    const formData = new FormData();
    formData.append('arquivo', arquivo);

    const response = await api.post(`/familias/${familyId}/documentos`, formData, {
      headers: {
      }
    });
    return response.data;
  },

  obter: async (familyId: string, id: string) => {
    const response = await api.get(`/familias/<span class="math-inline">\{familyId\}/documentos/</span>{id}`);
    return response.data;
  },

  remover: async (familyId: string, id: string) => {
    await api.delete(`/familias/<span class="math-inline">\{familyId\}/documentos/</span>{id}`);
  }
};