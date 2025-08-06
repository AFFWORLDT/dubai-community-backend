"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { ChatWindow } from './chat-window';
import { useQuery } from '@tanstack/react-query';
import { getCustomerChats } from '@/service/chat.service';
import { useAuthStore } from '@/Providers/auth-provider';
import { useChatContext } from './chat-context';

export const ChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  const { user } = useAuthStore();
  const { isChatting, setIsChatting, hasActiveChats, setHasActiveChats } = useChatContext();
  
  const { data: chats = [] } = useQuery({
    queryKey: ['customerChats'],
    queryFn: getCustomerChats,
    enabled: !!user,
    staleTime: 30000, // 30 seconds
  });
  
  const unreadCount = chats.reduce((total: number, chat: any) => {
    return total + (chat.unreadCustomer || 0);
  }, 0);

  // Update hasActiveChats when chats change
  useEffect(() => {
    const hasChats = chats.length > 0 || unreadCount > 0;
    setHasActiveChats(hasChats);
  }, [chats, unreadCount, setHasActiveChats]);

  // Update isChatting when showChat changes
  useEffect(() => {
    setIsChatting(showChat);
  }, [showChat, setIsChatting]);

  // Only show chat button if:
  // 1. User has active chats or unread messages, OR
  // 2. User is currently in a chat session
  const shouldShowChatButton = hasActiveChats || isChatting;
  
  // Don't render anything if no active chats and not currently chatting
  if (!shouldShowChatButton) {
    return null;
  }
  
  return (
    <>
      <Button
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => setShowChat(!showChat)}
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
      
      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
    </>
  );
};