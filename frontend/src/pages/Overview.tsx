import React from "react";
import Header from "@/components/layout/Header";
import AssetDistribution from "@/components/charts/AssetDistribution";
import DashboardCard from "@/components/ui/DashboardCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const wealthData = [
  { year: "2016", valor: 10000 },
  { year: "2017", valor: 12000 },
  { year: "2018", valor: 14000 },
  { year: "2019", valor: 16000 },
];

const incomeData = [
  { categoria: "Produto A", valor: 100 },
  { categoria: "Produto B", valor: 75 },
  { categoria: "Produto C", valor: 90 },
  { categoria: "Produto D", valor: 25 },
];

const Overview = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header pageTitle="Overview" />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Veja seu patrimônio!</h1>
          <p className="text-xl text-gray-600">
            Veja de forma simplificada seus dados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AssetDistribution />

          <DashboardCard title="Países relacionados">
            <div className="h-64 flex items-center justify-center text-gray-400">
              Mapa com países relacionados
            </div>
          </DashboardCard>

          <DashboardCard title="Distribuição de cotas">
            <div className="h-64 flex items-center justify-center text-gray-400">
              Gráfico de distribuição
            </div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <DashboardCard title="Evolução do Patrimonio" className="lg:col-span-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={wealthData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="valor"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          <DashboardCard title="Evolução de proventos">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          <DashboardCard title="Alertas">
            <div className="h-64 flex flex-col items-center justify-center text-gray-400">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <button className="bg-[#00E5DC] hover:bg-[#00E5DC]/80 text-white px-6 py-2 rounded">
                Ver notificações
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Overview;
