
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { sendMessage } from "@/utils/messageUtils";
import { toast } from "sonner";

const formSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
});

type FormValues = z.infer<typeof formSchema>;

interface MessageInputProps {
  onMessageSent: () => void;
}

const MessageInput = ({ onMessageSent }: MessageInputProps) => {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("You must be logged in to send messages");
      return;
    }
    
    setIsSending(true);
    
    try {
      await sendMessage(values.message, user.username);
      form.reset();
      onMessageSent();
    } catch (error) {
      console.error("Message sending error:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      form.handleSubmit(onSubmit)();
      e.preventDefault();
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                    placeholder="Type your message here..." 
                    className="min-h-[100px] resize-none"
                    onKeyDown={handleKeyDown}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Press Ctrl+Enter to send
            </p>
            <Button 
              type="submit" 
              disabled={isSending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MessageInput;
