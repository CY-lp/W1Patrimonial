import React from "react";
import Header from "@/components/layout/Header";
import DashboardCard from "@/components/ui/DashboardCard";

const incomeData = [
  {
    id: 1,
    date: "16/04",
    origin: "Aluguel Imoveis em maresias",
    amount: "R$500,00",
    beneficiary: "Lucas F. Monaco",
  },
  {
    id: 2,
    date: "17/04",
    origin: "Aluguel Imóveis em São Paulo",
    amount: "R$54.330,00",
    beneficiary: "Lucas F. Monaco",
  },
];

const Income = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header pageTitle="Distribuição e Proventos" />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Distribuição e Proventos</h1>
          <p className="text-xl text-gray-600">
            Olá! [nome] atualmente sua 'árvore' da holding se encontra em XPTO e com tanto de %. A maioria do patrimonio está distribuido em: x, y, z
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Agosto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {incomeData.map((income) => (
              <DashboardCard key={income.id}>
                <div className="bg-[#00E5DC] text-white p-4 -mx-6 -mt-6 mb-4">
                  <p>
                    {income.date} - Origem: {income.origin}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">{income.amount}</p>
                  <p className="text-gray-500">Beneficiário: {income.beneficiary}</p>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Próximos Meses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {incomeData.concat(incomeData).map((income, idx) => (
              <DashboardCard key={`future-${idx}`}>
                <div className="bg-[#00E5DC] text-white p-4 -mx-6 -mt-6 mb-4">
                  <p>
                    {income.date} - Origem: {income.origin}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">{income.amount}</p>
                  <p className="text-gray-500">Beneficiário: {income.beneficiary}</p>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
