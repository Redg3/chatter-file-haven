
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 py-12 px-4">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">FileChat</h1>
          <p className="text-xl mb-6 text-gray-600">
            Your secure platform for file storage and team communication
          </p>
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 flex-shrink-0">
                📁
              </div>
              <div>
                <h3 className="font-medium">Upload & Share Files</h3>
                <p className="text-sm">Store your important documents securely and access them from anywhere</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 flex-shrink-0">
                💬
              </div>
              <div>
                <h3 className="font-medium">Team Communication</h3>
                <p className="text-sm">Send messages and collaborate with your team in real-time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 flex-shrink-0">
                🔒
              </div>
              <div>
                <h3 className="font-medium">Secure & Private</h3>
                <p className="text-sm">Your files and messages are protected with the highest security standards</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          {showLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <RegisterForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
