import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface LoginData {
  email: string;
  senha: string;
}

interface GoogleLoginData {
  email: string;
  nome: string;
  googleId: string;
}

interface RegistroData {
  nome: string;
  email: string;
  senha: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const autenticacaoService = {
  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async loginGoogle(data: GoogleLoginData) {
    const response = await api.post('/auth/google', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async registro(data: RegistroData) {
    const response = await api.post('/auth/registro', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async obterUsuarioAtual() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  atualizarPerfil: async (data: any) => {
    const response = await api.put('/autenticacao/perfil', data);
    return response.data;
  },

  alterarSenha: async (data: { senhaAtual: string; novaSenha: string }) => {
    const response = await api.put('/autenticacao/senha', data);
    return response.data;
  }
}; 