import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Users, FileText, MessageSquare, User, HelpCircle } from "lucide-react";

const Sidebar = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-[#00E5DC]/10 text-[#00E5DC]"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  return (
    <div className="w-full h-full border-r bg-white flex flex-col">
      <div className="p-6 border-b">
        <img src="/W1.png" alt="Logo W1" className="h-8" />
      </div>

      <div className="py-4 flex-1">
        <div className="px-4 py-2 text-sm font-medium text-gray-500">Account</div>
        <nav className="mt-2 space-y-1 px-2">
          <NavLink to="/perfil" className={getNavClass}>
            <User className="w-5 h-5" />
            Perfil
          </NavLink>
          <NavLink to="/ajuda" className={getNavClass}>
            <HelpCircle className="w-5 h-5" />
            Ajuda
          </NavLink>
        </nav>

        <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-500">Live Dashboard</div>
        <nav className="mt-2 space-y-1 px-2">
          <NavLink to="/overview" className={getNavClass}>
            <Home className="w-5 h-5" />
            Overview
          </NavLink>
          <NavLink to="/family" className={getNavClass}>
            <Users className="w-5 h-5" />
            Família
          </NavLink>
          <NavLink to="/documents" className={getNavClass}>
            <FileText className="w-5 h-5" />
            Documentos
          </NavLink>
          <NavLink to="/income" className={getNavClass}>
            <BarChart2 className="w-5 h-5" />
            Proventos
          </NavLink>
          <NavLink to="/consultant" className={getNavClass}>
            <MessageSquare className="w-5 h-5" />
            Consultor
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
