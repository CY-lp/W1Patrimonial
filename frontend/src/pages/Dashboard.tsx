
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

import Header from "@/components/layout/Header";
import DashboardCard from "@/components/ui/DashboardCard";
import AssetOverview from "@/components/dashboard/AssetOverview";
import FamilyMembers from "@/components/dashboard/FamilyMembers";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header pageTitle="Home" />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Bem vindo Nome!</h1>
          <p className="text-xl text-gray-600">
            Que tal acompanharmos seu patrimônio de forma simples?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <DashboardCard title="Seu Patrimônio Hoje">
              <AssetOverview />
            </DashboardCard>
          </div>

          <div className="md:col-span-1">
            <DashboardCard title="Rentabilidade Mensal">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold">23,44%</div>
                <div className="flex items-center mt-2 text-green-500 text-sm font-medium">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <span>16,5%</span>
                  <span className="ml-2 text-gray-500 font-normal">
                    Comparado ao mês passado
                  </span>
                </div>
              </div>
            </DashboardCard>
          </div>

          <div className="md:col-span-1">
            <DashboardCard title="Rentabilidade Anual">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold">23,44%</div>
                <div className="flex items-center mt-2 text-red-500 text-sm font-medium">
                  <ArrowDown className="w-4 h-4 mr-1" />
                  <span>16,5%</span>
                  <span className="ml-2 text-gray-500 font-normal">
                    Comparado ao mês passado
                  </span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>

        <div className="mt-6">
          <FamilyMembers />
        </div>

        <div className="mt-6">
          <DashboardCard title="Seu Patrimônio Hoje">
            <div className="h-48 flex items-center justify-center text-gray-400">
              Gráfico de patrimônio
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
