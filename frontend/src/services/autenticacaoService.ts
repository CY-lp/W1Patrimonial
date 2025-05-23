import axios from 'axios';
import api from './api';

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

export const autenticacaoService = {
  async login(data: LoginData) {
    const response = await api.post('/autenticacao/login', data); 
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async loginGoogle(data: GoogleLoginData) {
    const response = await api.post('/autenticacao/login/google', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async registro(data: RegistroData) {
    const response = await api.post('/autenticacao/registrar', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async obterUsuarioAtual() {
    const response = await api.get('/autenticacao/me');
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