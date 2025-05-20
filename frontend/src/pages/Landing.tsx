
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b">
        <div className="w1-logo text-2xl font-bold text-w1-navy">w1</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-w1-teal">Produtos</a>
          <a href="#" className="text-gray-700 hover:text-w1-teal">Parceiros</a>
          <a href="#" className="text-gray-700 hover:text-w1-teal">Recursos</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-w1-teal">
            Entrar
          </Link>
          <Link to="/cadastro">
            <Button className="bg-w1-teal hover:bg-teal-400 text-white">
              Criar Conta
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 flex flex-col lg:flex-row items-center py-16">
        <div className="lg:w-1/2 lg:pr-16 space-y-6 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-w1-navy leading-tight">
            O familly office,<br />
            Simplificado e Ágil.
          </h1>
          <p className="text-lg text-gray-700">
            O caminho das suas conquistas, de forma fácil, simples<br />
            e prática para o dia a dia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex-grow">
              <Input 
                type="email" 
                placeholder="Insira seu email de trabalho" 
                className="w-full h-12"
              />
            </div>
            <Button className="bg-w1-teal hover:bg-teal-400 text-white px-8 h-12">
              Começar
            </Button>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full border-2 border-w1-teal flex items-center justify-center mr-2">
              <div className="text-w1-teal">▶</div>
            </div>
            <span className="text-w1-teal">Veja a trex em ação</span>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          {/* Placeholder for the right side image/illustration */}
          <div className="w-full h-[400px] bg-gray-100 rounded-lg relative overflow-hidden">
            {/* Here you would place the plant and mobile phone image */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
