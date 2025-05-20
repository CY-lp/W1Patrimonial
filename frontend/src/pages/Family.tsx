
import React from "react";
import Header from "@/components/layout/Header";
import DashboardCard from "@/components/ui/DashboardCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

const familyMembers = [
  {
    id: 1,
    name: "Lucas F. Monaco",
    relation: "Filho",
    allocation: "40% Majoritariamente Imóveis",
    data: [
      { name: "Imóveis", value: 40, color: "#3B82F6" },
      { name: "Ações", value: 30, color: "#60A5FA" },
      { name: "FIIs", value: 10, color: "#93C5FD" },
      { name: "Outros", value: 20, color: "#BFDBFE" },
    ],
  },
  {
    id: 2,
    name: "Daniela Monaco",
    relation: "Filha",
    allocation: "10% Majoritariamente Imóveis",
    data: [
      { name: "Imóveis", value: 40, color: "#3B82F6" },
      { name: "Ações", value: 30, color: "#60A5FA" },
      { name: "FIIs", value: 10, color: "#93C5FD" },
      { name: "Outros", value: 20, color: "#BFDBFE" },
    ],
  },
  {
    id: 3,
    name: "Marielle",
    relation: "Esposa",
    allocation: "30% Majoritariamente Imóveis",
    data: [
      { name: "Imóveis", value: 40, color: "#3B82F6" },
      { name: "Ações", value: 30, color: "#60A5FA" },
      { name: "FIIs", value: 10, color: "#93C5FD" },
      { name: "Outros", value: 20, color: "#BFDBFE" },
    ],
  },
];

const Family = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header pageTitle="Familia" />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sua Família</h1>
          <p className="text-xl text-gray-600">
            Veja a composição da sua família na holding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <DashboardCard key={member.id}>
              <div className="text-center mb-4">
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-gray-500">{member.relation}</p>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={member.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {member.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="mb-4">{member.allocation}</p>
                <Button variant="outline" className="w-full border-black">
                  Acessar Documentos
                </Button>
              </div>
            </DashboardCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Family;
