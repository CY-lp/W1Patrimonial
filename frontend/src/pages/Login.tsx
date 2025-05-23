import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { validarEmail } from '@/utils/validadores';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loginGoogle } = useAuth();

  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [errors, setErrors] = useState({ email: '', senha: '' });
  const [loading, setLoading] = useState(false);

  const validarFormulario = () => {
    const novosErros = { email: '', senha: '' };

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
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    const resultado = await login(formData.email, formData.senha);
    setLoading(false);

    if (resultado.success) {
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro ao fazer login",
        description: resultado.error,
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      if (!user.email || !user.displayName) throw new Error('Dados do Google incompletos');

      setLoading(true);
      const resultado = await loginGoogle(user.email, user.displayName, user.uid);
      setLoading(false);

      if (resultado.success) {
        navigate('/dashboard');
      } else {
        toast({
          title: "Erro ao fazer login com Google",
          description: resultado.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login com Google",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 md:p-16 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="w1-logo mb-8">
            <img src="/W1.png" alt="Logo W1" className="h-8" />
          </div>

          <h1 className="text-2xl font-medium mb-8">Entre com sua conta na Tree</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-900">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full h-12 border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="senha" className="block text-gray-900">Senha</label>
              <Input
                id="senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                className={`w-full h-12 border-gray-300 ${errors.senha ? 'border-red-500' : ''}`}
              />
              {errors.senha && <p className="text-sm text-red-500 mt-1">{errors.senha}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white h-12 font-medium rounded-md"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">ou</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full border border-gray-300 h-12 flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>{loading ? 'Processando...' : 'Entrar com Google'}</span>
          </Button>

          <div className="mt-8 text-center">
            <p className="text-gray-700">
              Novo na Tree? <Link to="/cadastro" className="text-gray-900 font-medium hover:underline">Crie sua conta</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-3/5 xl:w-2/3 bg-[#0A0A0A] relative overflow-hidden">
        <img
          src="/Login.png"
          alt="Planta decorativa com formulário"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;