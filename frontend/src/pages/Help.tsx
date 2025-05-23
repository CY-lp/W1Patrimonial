import React from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Help = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header pageTitle="Central de Ajuda" />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Como podemos ajudar?</h1>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Busque sua dúvida aqui..."
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00E5DC] focus:border-transparent"
              />
              <Search className="absolute left-4 top-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Perguntas Frequentes</h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Como funciona a distribuição de proventos?</h3>
                  <p className="text-gray-600">A distribuição de proventos é realizada de acordo com a participação de cada membro na holding. Os valores são calculados automaticamente e distribuídos conforme as regras estabelecidas no contrato social.</p>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Como adicionar um novo membro à família?</h3>
                  <p className="text-gray-600">Para adicionar um novo membro, acesse a seção "Família" no menu lateral e clique no botão "Adicionar Membro". Preencha as informações necessárias e defina a participação societária.</p>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Como atualizar meus documentos?</h3>
                  <p className="text-gray-600">Na seção "Documentos", você pode fazer upload de novos documentos ou atualizar os existentes. Aceitamos arquivos PDF, JPG e PNG. Todos os documentos são armazenados de forma segura.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Precisa de mais ajuda?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Fale com seu Consultor</h3>
                  <p className="text-gray-600 mb-4">Tire suas dúvidas diretamente com seu consultor designado.</p>
                  <Button className="bg-[#00E5DC] hover:bg-[#00E5DC]/80 text-white">
                    Iniciar Chat
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Suporte Técnico</h3>
                  <p className="text-gray-600 mb-4">Problemas técnicos? Nossa equipe está pronta para ajudar.</p>
                  <Button className="bg-[#00E5DC] hover:bg-[#00E5DC]/80 text-white">
                    Abrir Chamado
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help; 