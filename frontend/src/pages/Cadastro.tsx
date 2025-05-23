import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Cadastro = () => {
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Login com Google bem-sucedido:", credentialResponse);
    // Aqui você pode decodificar o token JWT e obter informações do usuário
    // Exemplo: jwtDecode(credentialResponse.credential)
  };

  const handleGoogleError = () => {
    console.log("Erro no login com Google");
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 md:p-16 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="w1-logo mb-8">
            <img src="/W1.png" alt="Logo W1" className="h-8" />
          </div>

          {/* Título */}
          <h1 className="text-2xl font-medium mb-8">Criar sua conta na Tree</h1>

          {/* Formulário */}
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-900">Email</label>
              <Input 
                id="email"
                type="email"
                className="w-full h-12 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-900">Senha</label>
              <Input
                id="password" 
                type="password"
                className="w-full h-12 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-gray-900">Confirmar Senha</label>
              <Input
                id="confirmPassword" 
                type="password"
                className="w-full h-12 border-gray-300"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white h-12 font-medium rounded-md"
            >
              Criar conta
            </Button>
          </form>

          {/* Separador */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">ou</span>
            </div>
          </div>

          {/* Botão de Login com Google */}
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />
          </div>

          {/* Link para Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-700">
              Já possui uma conta? <Link to="/login" className="text-gray-900 font-medium hover:underline">Entre aqui</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Lado Direito - Imagem */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 xl:w-2/3 bg-[#0A0A0A] relative overflow-hidden">
        <img 
          src="/Create.png" 
          alt="Planta decorativa com formulário" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Cadastro;
