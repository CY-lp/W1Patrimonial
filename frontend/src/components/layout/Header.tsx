import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  pageTitle?: string;
}

const Header = ({ pageTitle }: HeaderProps) => {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
      <div className="flex items-center gap-8">
        <Link to="/overview" className="w1-logo">
          <img src="/W1.png" alt="Logo W1" className="h-10" />
        </Link>
        {pageTitle && <h1 className="text-xl font-medium">{pageTitle}</h1>}
      </div>
      <div className="flex-1"></div>
      <Link to="/ajuda">
        <Button className="bg-[#00E5DC] hover:bg-[#00E5DC]/80 text-white">Ajuda</Button>
      </Link>
    </header>
  );
};

export default Header;
