import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, Shield, Clock } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b">
        <div className="w1-logo">
          <img src="/W1.png" alt="Logo W1" className="h-10" />
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-w1-teal">Produtos</a>
          <a href="#" className="text-gray-700 hover:text-w1-teal">Parceiros</a>
          <a href="#" className="text-gray-700 hover:text-w1-teal">Recursos</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-w1-teal">Entrar</Link>
          <Link to="/cadastro">
            <Button className="bg-w1-teal hover:bg-teal-400 text-white">
              Criar Conta
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 flex flex-col lg:flex-row items-center py-16">
        <div className="lg:w-1/2 lg:pr-16 space-y-6 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-w1-navy leading-tight">
            O family office,<br />
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
            <Link to="/login">
              <Button className="bg-w1-teal hover:bg-teal-400 text-white px-8 h-12">
                Começar
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 rounded-full border-2 border-w1-teal flex items-center justify-center mr-2">
              <div className="text-w1-teal">▶</div>
            </div>
            <span className="text-w1-teal">Veja a W1 em ação</span>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <img 
            src="/phoneplant1.png" 
            alt="Planta e smartphone com dashboard financeiro" 
            className="w-full h-auto object-contain"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-w1-navy text-center mb-12">
            Por que escolher a W1?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-w1-teal/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-w1-teal" />
              </div>
              <h3 className="text-xl font-semibold text-w1-navy mb-3">
                Gestão Integrada
              </h3>
              <p className="text-gray-600">
                Acompanhe todos os seus investimentos e patrimônio em uma única plataforma, com dashboards intuitivos e relatórios personalizados.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-w1-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-w1-teal" />
              </div>
              <h3 className="text-xl font-semibold text-w1-navy mb-3">
                Segurança Avançada
              </h3>
              <p className="text-gray-600">
                Seus dados protegidos com criptografia de ponta a ponta e conformidade com as principais regulamentações do mercado.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-w1-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-w1-teal" />
              </div>
              <h3 className="text-xl font-semibold text-w1-navy mb-3">
                Economia de Tempo
              </h3>
              <p className="text-gray-600">
                Automatize processos e tome decisões mais rápidas com nossa plataforma intuitiva e ferramentas de análise em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;