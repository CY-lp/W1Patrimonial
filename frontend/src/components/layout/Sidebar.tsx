
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Users, FileText, MessageSquare } from "lucide-react";

const Sidebar = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link-active" : "hover:bg-gray-50"}`;

  return (
    <div className="w-full h-full border-r bg-white flex flex-col">
      <div className="p-6 border-b">
        <div className="w1-logo">W1</div>
      </div>

      <div className="py-4 flex-1">
        <div className="px-4 py-2 text-sm font-medium text-gray-500">Account</div>
        <nav className="mt-2 space-y-1 px-2">
          <NavLink to="/perfil" className={getNavClass}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Perfil
          </NavLink>
          <NavLink to="/ajuda" className={getNavClass}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
            Ajuda
          </NavLink>
        </nav>

        <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-500">Live Dashboard</div>
        <nav className="mt-2 space-y-1 px-2">
          <NavLink to="/" className={getNavClass}>
            <Home className="w-5 h-5" />
            Home
          </NavLink>
          <NavLink to="/overview" className={getNavClass}>
            <BarChart2 className="w-5 h-5" />
            OverView
          </NavLink>
          <NavLink to="/family" className={getNavClass}>
            <Users className="w-5 h-5" />
            Familly
          </NavLink>
          <NavLink to="/income" className={getNavClass}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2 16l6-6 4 4 10-10"></path><path d="M22 6V2h-4"></path></svg>
            Proventos
          </NavLink>
          <NavLink to="/documents" className={getNavClass}>
            <FileText className="w-5 h-5" />
            Documentos
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
