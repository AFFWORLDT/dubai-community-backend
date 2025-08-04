"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { ChatWindow } from './chat-window';
import { useQuery } from '@tanstack/react-query';
import { getCustomerChats } from '@/service/chat.service';
import { useAuthStore } from '@/Providers/auth-provider';

export const ChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  const { user } = useAuthStore();
  
  const { data: chats = [] } = useQuery({
    queryKey: ['customerChats'],
    queryFn: getCustomerChats,
    enabled: !!user,
    staleTime: 30000, // 30 seconds
  });
  
  const unreadCount = chats.reduce((total: number, chat: any) => {
    return total + (chat.unreadCustomer || 0);
  }, 0);
  
  return (
    <>
      <Button
        className="fixed top-20 right-6 rounded-full w-12 h-12 shadow-lg z-50"
        onClick={() => setShowChat(!showChat)}
      >
        <MessageCircle className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
      
      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
    </>
  );
};