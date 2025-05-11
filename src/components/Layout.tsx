
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, File, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

const Layout = ({ children, activeTab }: LayoutProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">FileChat</h1>
          
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                Welcome, {user?.username}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-6 px-4">
        {isAuthenticated && (
          <Tabs defaultValue={activeTab || "files"} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger 
                value="files" 
                onClick={() => navigate("/dashboard?tab=files")}
                className="flex items-center gap-2"
              >
                <File className="h-4 w-4" />
                Files
              </TabsTrigger>
              <TabsTrigger 
                value="messages" 
                onClick={() => navigate("/dashboard?tab=messages")}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        {children}
      </main>
      
      <footer className="bg-white border-t py-4 px-6">
        <div className="container mx-auto text-center text-sm text-gray-500">
          FileChat © {new Date().getFullYear()} - Your secure file storage and messaging platform
        </div>
      </footer>
    </div>
  );
};

export default Layout;
