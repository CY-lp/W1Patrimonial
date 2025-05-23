import React from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/ui/DashboardCard";

const AssetOverview = () => {
  return (
    <DashboardCard>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">$4.549.043,12</h2>
        <div className="flex gap-2">
          <Button className="flex-1 bg-[#00E5DC] hover:bg-[#00E5DC]/80 text-white">Detalhes</Button>
          <Button className="flex-1" variant="outline">
            Holding
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AssetOverview;
