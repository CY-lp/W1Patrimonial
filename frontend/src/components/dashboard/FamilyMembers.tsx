
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardCard from "@/components/ui/DashboardCard";

const familyMembers = [
  {
    id: 1,
    name: "João",
    image: "https://i.pravatar.cc/150?img=1",
    initials: "JP",
  },
  {
    id: 2,
    name: "Maria",
    image: "https://i.pravatar.cc/150?img=5",
    initials: "MC",
  },
  {
    id: 3,
    name: "Pedro",
    image: "https://i.pravatar.cc/150?img=8",
    initials: "PS",
  },
];

const FamilyMembers = () => {
  return (
    <DashboardCard title="Sua Família">
      <div className="flex flex-wrap gap-3">
        {familyMembers.map((member) => (
          <Avatar key={member.id} className="h-12 w-12">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="h-12 w-12 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors">
          <AvatarFallback>+</AvatarFallback>
        </Avatar>
      </div>
    </DashboardCard>
  );
};

export default FamilyMembers;
