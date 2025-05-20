
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import DashboardCard from "../ui/DashboardCard";

const data = [
  { name: "Imóveis", value: 40, color: "#3B82F6" },
  { name: "Ações", value: 30, color: "#60A5FA" },
  { name: "FIIs", value: 10, color: "#93C5FD" },
  { name: "Outros", value: 20, color: "#BFDBFE" },
];

const AssetDistribution = () => {
  return (
    <DashboardCard title="Composição do patrimônio">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default AssetDistribution;
