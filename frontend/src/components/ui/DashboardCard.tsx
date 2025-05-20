
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={`${!title ? 'pt-6' : ''}`}>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
