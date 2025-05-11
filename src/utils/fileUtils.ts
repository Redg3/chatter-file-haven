
export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploaded: Date;
  url: string;
}

// Mock file storage (in a real app, these would be stored in a database or cloud storage)
let mockFiles: FileItem[] = [];

export const getFiles = (): FileItem[] => {
  return [...mockFiles];
};

export const uploadFile = (file: File): Promise<FileItem> => {
  return new Promise((resolve) => {
    // Create a file URL for preview (in a real app, this would be a storage URL)
    const fileUrl = URL.createObjectURL(file);
    
    // Create a new file item
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploaded: new Date(),
      url: fileUrl,
    };
    
    // Add to mock storage
    mockFiles = [newFile, ...mockFiles];
    
    // Simulate network delay
    setTimeout(() => {
      resolve(newFile);
    }, 500);
  });
};

export const deleteFile = (fileId: string): Promise<void> => {
  return new Promise((resolve) => {
    // Remove from mock storage
    mockFiles = mockFiles.filter(file => file.id !== fileId);
    
    // Simulate network delay
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (fileType: string): string => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType.startsWith('video/')) return '🎬';
  if (fileType.startsWith('audio/')) return '🎵';
  if (fileType.includes('pdf')) return '📄';
  if (fileType.includes('word') || fileType.includes('document')) return '📝';
  if (fileType.includes('sheet') || fileType.includes('excel')) return '📊';
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) return '📽️';
  if (fileType.includes('zip') || fileType.includes('compressed')) return '🗜️';
  return '📁';
};
