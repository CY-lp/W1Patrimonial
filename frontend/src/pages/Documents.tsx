
import React from "react";
import Header from "@/components/layout/Header";
import DashboardCard from "@/components/ui/DashboardCard";
import { Button } from "@/components/ui/button";

const documentCategories = [
  { id: 1, title: "Imóveis" },
  { id: 2, title: "Holding" },
  { id: 3, title: "Pessoa Física" },
  { id: 4, title: "Tributário" },
  { id: 5, title: "Herdeiros" },
  { id: 6, title: "Investimentos" },
  { id: 7, title: "Pessoa Jurídica" },
];

const Documents = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header pageTitle="Documentos" />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Veja suas informações</h1>
          <p className="text-xl text-gray-600">
            Documentos para você enviar e atualizar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentCategories.map((category) => (
            <DashboardCard key={category.id} title={category.title}>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="bg-black text-white hover:bg-gray-800 w-full">
                  Enviar Documentos
                </Button>
                <Button variant="ghost" className="text-gray-500 w-full">
                  Ver documentos
                </Button>
              </div>
            </DashboardCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
