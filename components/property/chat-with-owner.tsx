"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { initializeChat } from '@/service/chat.service';
import { useAuthStore } from '@/Providers/auth-provider';
import { useRouter } from 'next/navigation';
import { ChatWindow } from '../chat/chat-window';
import { useChatContext } from '../chat/chat-context';

interface ChatWithOwnerProps {
  propertyId: string;
  ownerId?: string;
  variant?: 'default' | 'secondary' | 'outline';
}

export function ChatWithOwner({ 
  propertyId, 
  ownerId,
  variant = 'default'
}: ChatWithOwnerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { setIsChatting, setHasActiveChats } = useChatContext();

  const handleChatWithOwner = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please log in to chat with the property owner",
        variant: "destructive",
      });
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    try {
      setIsLoading(true);
      const chat = await initializeChat(propertyId, user._id);
      setShowChat(true);
      setIsChatting(true);
      setHasActiveChats(true);
    } catch (error) {
      toast({
        title: "Failed to start conversation",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Failed to initialize chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setIsChatting(false);
  };

  return (
    <>
      <Button 
        onClick={handleChatWithOwner} 
        disabled={isLoading}
        variant={variant}
        className="flex items-center gap-1.5 sm:gap-2 w-full text-xs sm:text-sm h-8 sm:h-10"
      >
        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Chat with Owner</span>
        <span className="xs:hidden">Chat</span>
      </Button>
      
      {showChat && <ChatWindow onClose={handleCloseChat} />}
    </>
  );
}