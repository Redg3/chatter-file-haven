
export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

// Mock message storage (in a real app, these would be stored in a database)
let mockMessages: Message[] = [
  {
    id: '1',
    text: 'Welcome to FileChat! Upload your files and start messaging.',
    sender: 'system',
    timestamp: new Date(),
  },
];

export const getMessages = (): Message[] => {
  return [...mockMessages];
};

export const sendMessage = (text: string, sender: string): Promise<Message> => {
  return new Promise((resolve) => {
    // Create a new message
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    
    // Add to mock storage
    mockMessages = [...mockMessages, newMessage];
    
    // Simulate network delay
    setTimeout(() => {
      resolve(newMessage);
    }, 300);
  });
};

export const deleteMessage = (messageId: string): Promise<void> => {
  return new Promise((resolve) => {
    // Remove from mock storage
    mockMessages = mockMessages.filter(message => message.id !== messageId);
    
    // Simulate network delay
    setTimeout(() => {
      resolve();
    }, 200);
  });
};

export const formatMessageTime = (date: Date): string => {
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

export const formatMessageDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
};
