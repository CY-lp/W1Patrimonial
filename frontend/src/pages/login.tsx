import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { validarEmail } from '@/utils/validadores';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loginGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    senha: ''
  });

  const validarFormulario = () => {
    const novosErros = {
      email: '',
      senha: ''
    };

    if (!formData.email) {
      novosErros.email = 'Email é obrigatório';
    } else if (!validarEmail(formData.email)) {
      novosErros.email = 'Email inválido';
    }

    if (!formData.senha) {
      novosErros.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(novosErros);
    return !novosErros.email && !novosErros.senha;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
    const resultado = await login(formData.email, formData.senha);
    setLoading(false);

    if (resultado.success) {
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro ao fazer login",
        description: resultado.error,
        variant: "destructive"
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      
      if (!user.email || !user.displayName) {
        throw new Error('Dados do Google incompletos');
      }

      setLoading(true);
      const resultado = await loginGoogle(
        user.email,
        user.displayName,
        user.uid
      );
      setLoading(false);

      if (resultado.success) {
        navigate('/dashboard');
      } else {
        toast({
          title: "Erro ao fazer login com Google",
          description: resultado.error,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login com Google",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Bem-vindo de volta</h2>
          <p className="text-muted-foreground">Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className={errors.senha ? 'border-red-500' : ''}
            />
            {errors.senha && (
              <p className="text-sm text-red-500 mt-1">{errors.senha}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !formData.email || !formData.senha}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {loading ? "Processando..." : "Entrar com Google"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Button
            variant="link"
            className="p-0"
            onClick={() => navigate('/cadastro')}
            disabled={loading}
          >
            Cadastre-se
          </Button>
        </p>
      </div>
    </div>
  );
} 