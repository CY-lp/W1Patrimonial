
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Cadastro = () => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 md:p-16 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="w1-logo text-2xl font-bold text-w1-navy mb-12">w1</div>
          
          <h1 className="text-xl font-semibold mb-8">Criar sua conta na Tree</h1>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <Input 
                id="email"
                type="email"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700">Senha</label>
              <Input
                id="password" 
                type="password"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar Senha</label>
              <Input
                id="confirmPassword" 
                type="password"
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-w1-teal hover:bg-teal-400 text-white h-12"
            >
              Criar conta
            </Button>
          </form>
          
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">ou</span>
            </div>
          </div>
          
          <Button 
            variant="outline"
            className="w-full border-gray-300 h-12 flex items-center justify-center gap-2"
          >
            <span className="text-2xl">G</span>
            <span>Criar conta com Google</span>
          </Button>
          
          <div className="mt-10 text-center">
            <p className="text-gray-700">
              Já possui uma conta?
              <Link to="/login" className="ml-1 text-w1-navy font-semibold hover:underline">
                Entre aqui
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-3/5 xl:w-2/3 bg-gray-100">
        {/* This is where the plant image would go */}
        <div className="h-full w-full bg-gray-100"></div>
      </div>
    </div>
  );
};

export default Cadastro;
