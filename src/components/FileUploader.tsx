
import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { uploadFile } from "@/utils/fileUtils";
import { toast } from "sonner";

interface FileUploaderProps {
  onUploadComplete: () => void;
}

const FileUploader = ({ onUploadComplete }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };
  
  const handleFileUpload = async (files: FileList) => {
    if (!user) {
      toast.error("You must be logged in to upload files");
      return;
    }
    
    setIsUploading(true);
    let uploadedCount = 0;
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Simulate progress
        const simulateProgress = () => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 5;
            setUploadProgress(progress);
            if (progress >= 100) {
              clearInterval(interval);
            }
          }, 100);
          return () => clearInterval(interval);
        };
        
        const clearSimulation = simulateProgress();
        
        await uploadFile(file);
        clearSimulation();
        
        uploadedCount++;
        toast.success(`Uploaded ${file.name}`);
      }
      
      if (uploadedCount > 0) {
        onUploadComplete();
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("Failed to upload file(s)");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-colors text-center ${
          isDragging 
            ? "border-blue-400 bg-blue-50" 
            : "border-gray-300 hover:border-blue-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        
        <div className="flex flex-col items-center justify-center text-gray-500">
          <Upload className="h-12 w-12 mb-3 text-blue-500" />
          <p className="text-lg font-medium mb-2">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-sm mb-4">or click to browse</p>
          <Button 
            type="button" 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation();
              triggerFileInput();
            }}
          >
            Select Files
          </Button>
        </div>
      </div>
      
      {isUploading && (
        <div className="mt-4">
          <p className="text-sm mb-2 text-gray-600">Uploading...</p>
          <Progress value={uploadProgress} className="h-2 w-full" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
