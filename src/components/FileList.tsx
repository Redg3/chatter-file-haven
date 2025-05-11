
import React from "react";
import { FileItem, formatFileSize, getFileIcon } from "@/utils/fileUtils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteFile } from "@/utils/fileUtils";
import { Download } from "lucide-react";

interface FileListProps {
  files: FileItem[];
  onFileDelete: () => void;
}

const FileList = ({ files, onFileDelete }: FileListProps) => {
  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      onFileDelete();
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("File deletion error:", error);
      toast.error("Failed to delete file");
    }
  };
  
  const handleDownload = (file: FileItem) => {
    try {
      // Create an anchor element and set download attributes
      const anchor = document.createElement("a");
      anchor.href = file.url;
      anchor.download = file.name;
      anchor.style.display = "none";
      
      // Append to body, click and remove
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      
      toast.success(`Downloading ${file.name}`);
    } catch (error) {
      console.error("File download error:", error);
      toast.error("Failed to download file");
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg bg-gray-50">
        <p className="text-gray-500">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 font-medium text-gray-600 border-b bg-gray-50">
        <div className="col-span-5">Name</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-3">Uploaded</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>
      
      <div className="divide-y">
        {files.map((file) => (
          <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
            <div className="col-span-5 flex items-center gap-3">
              <span className="text-xl">{getFileIcon(file.type)}</span>
              <span className="truncate font-medium">{file.name}</span>
            </div>
            <div className="col-span-2 text-sm text-gray-600">
              {formatFileSize(file.size)}
            </div>
            <div className="col-span-3 text-sm text-gray-600">
              {new Date(file.uploaded).toLocaleDateString()}
            </div>
            <div className="col-span-2 flex gap-2 justify-end">
              <Button 
                size="sm" 
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => handleDownload(file)}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDelete(file.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
