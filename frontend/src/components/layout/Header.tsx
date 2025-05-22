import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  pageTitle?: string;
}

const Header = ({ pageTitle }: HeaderProps) => {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
      <div className="flex items-center gap-8">
        <div className="w1-logo">
          <img src="/W1.png" alt="Logo W1" className="h-10" />
        </div>
        {pageTitle && <h1 className="text-xl font-medium">{pageTitle}</h1>}
      </div>
      <div className="flex-1"></div>
      <Button className="bg-w1-teal hover:bg-teal-400 text-white">Ajuda</Button>
    </header>
  );
};

export default Header;
