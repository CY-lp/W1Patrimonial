import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { autenticacaoService } from '@/services';

interface User {
  id: string;
  nome: string;
  email: string;
  tipo: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      autenticacaoService.obterUsuarioAtual()
        .then(user => setUser(user))
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate]);



  /* const login = async (email: string, senha: string) => {
    try {
      const { user } = await autenticacaoService.login({ email, senha });
      setUser(user);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login'
      };
    }
  };*/

    const login = async (email: string, senha: string) => {
  // Ignora autenticação e seta usuário fake
  setUser({
    id: 'fake-id',
    nome: 'Usuário Teste',
    email,
    tipo: 'CLIENTE'
  });
  return { success: true };
};

  const loginGoogle = async (email: string, nome: string, googleId: string) => {
    try {
      const { user } = await autenticacaoService.loginGoogle({ email, nome, googleId });
      setUser(user);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao fazer login com Google'
      };
    }
  };

  const registro = async (nome: string, email: string, senha: string) => {
    try {
      const { user } = await autenticacaoService.registro({ nome, email, senha });
      setUser(user);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao criar conta'
      };
    }
  };

  const logout = () => {
    autenticacaoService.logout();
    setUser(null);
    navigate('/login');
  };

  return {
    user,
    loading,
    login,
    loginGoogle,
    registro,
    logout,
    isAuthenticated: !!user
  };
} 