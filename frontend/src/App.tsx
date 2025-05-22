import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

import Sidebar from "@/components/layout/Sidebar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Overview from "./pages/Overview";
import Family from "./pages/Family";
import Documents from "./pages/Documents";
import Income from "./pages/Income";
import Consultant from "./pages/Consultant";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";
import Perfil from "./pages/Perfil";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            
            {/* Rotas protegidas com sidebar */}
            <Route
              path="/*"
              element={
                <SidebarProvider>
                  <div className="flex h-screen w-full">
                    <div className="w-64 hidden md:block">
                      <Sidebar />
                    </div>
                    <div className="flex-1 overflow-auto">
                      <Routes>
                        <Route path="/" element={<Navigate to="/overview" replace />} />
                        <Route path="/overview" element={<Overview />} />
                        <Route path="/family" element={<Family />} />
                        <Route path="/documents" element={<Documents />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/consultant" element={<Consultant />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="/ajuda" element={<Help />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                </SidebarProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
