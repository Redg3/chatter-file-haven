
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
