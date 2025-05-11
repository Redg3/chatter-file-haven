
import React from "react";
import { Message, formatMessageTime, formatMessageDate } from "@/utils/messageUtils";

interface MessageListProps {
  messages: Message[];
}

interface GroupedMessages {
  [date: string]: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  // Group messages by date
  const groupedMessages: GroupedMessages = messages.reduce((groups, message) => {
    const date = formatMessageDate(new Date(message.timestamp));
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as GroupedMessages);
  
  if (messages.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg bg-gray-50">
        <p className="text-gray-500">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-sm font-medium text-gray-500">
              {date}
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="space-y-4">
            {dateMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg ${
                  message.sender === "system"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-blue-50 border border-blue-100"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">
                    {message.sender === "system" ? "System" : message.sender}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatMessageTime(new Date(message.timestamp))}
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
