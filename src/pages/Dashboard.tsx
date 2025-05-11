
import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import FileUploader from "@/components/FileUploader";
import FileList from "@/components/FileList";
import MessageInput from "@/components/MessageInput";
import MessageList from "@/components/MessageList";
import { useAuth } from "@/context/AuthContext";
import { FileItem, getFiles } from "@/utils/fileUtils";
import { Message, getMessages } from "@/utils/messageUtils";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "files";
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  useEffect(() => {
    // Load files on mount or when files are updated
    setFiles(getFiles());
  }, []);
  
  useEffect(() => {
    // Load messages on mount or when messages are updated
    setMessages(getMessages());
  }, []);
  
  const handleFileUploadComplete = () => {
    setFiles(getFiles());
  };
  
  const handleFileDelete = () => {
    setFiles(getFiles());
  };
  
  const handleMessageSent = () => {
    setMessages(getMessages());
  };

  return (
    <Layout activeTab={activeTab}>
      <div className="max-w-4xl mx-auto">
        {activeTab === "files" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Files</h2>
            <FileUploader onUploadComplete={handleFileUploadComplete} />
            <FileList files={files} onFileDelete={handleFileDelete} />
          </div>
        )}
        
        {activeTab === "messages" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Messages</h2>
            <div className="space-y-8">
              <MessageList messages={messages} />
              <MessageInput onMessageSent={handleMessageSent} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
