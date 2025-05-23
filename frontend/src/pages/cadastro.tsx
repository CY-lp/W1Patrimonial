import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { validarEmail } from '@/utils/validadores';

export default function Cadastro() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { registro } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const validarFormulario = () => {
    const novosErros = {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: ''
    };

    if (!formData.nome) {
      novosErros.nome = 'Nome é obrigatório';
    } else if (formData.nome.length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

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

    if (!formData.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(novosErros);
    return !Object.values(novosErros).some(error => error !== '');
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
    const resultado = await registro(formData.nome, formData.email, formData.senha);
    setLoading(false);

    if (resultado.success) {
      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro ao criar conta",
        description: resultado.error,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Criar nova conta</h2>
          <p className="text-muted-foreground">Preencha os dados para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? 'border-red-500' : ''}
            />
            {errors.nome && (
              <p className="text-sm text-red-500 mt-1">{errors.nome}</p>
            )}
          </div>

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

          <div>
            <Input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className={errors.confirmarSenha ? 'border-red-500' : ''}
            />
            {errors.confirmarSenha && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmarSenha}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !formData.email || !formData.senha || !formData.nome || !formData.confirmarSenha}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Button
            variant="link"
            className="p-0"
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Entrar
          </Button>
        </p>
      </div>
    </div>
  );
} 