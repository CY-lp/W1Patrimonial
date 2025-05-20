
import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  pageTitle?: string;
}

const Header = ({ pageTitle }: HeaderProps) => {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
      {pageTitle && <h1 className="text-xl font-medium">{pageTitle}</h1>}
      <div className="flex-1"></div>
      <Button className="bg-w1-teal hover:bg-teal-400 text-white">Ajuda</Button>
    </header>
  );
};

export default Header;
