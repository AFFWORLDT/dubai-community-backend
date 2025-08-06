"use client";

import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCustomerChats } from '@/service/chat.service';
import { useAuthStore } from '@/Providers/auth-provider';

export const ChatNotification = () => {
  const { user } = useAuthStore();
  const previousChatsRef = useRef<any[]>([]);
  
  const { data: chats = [] } = useQuery({
    queryKey: ['customerChats'],
    queryFn: getCustomerChats,
    enabled: !!user,
    refetchInterval: 10000, // 10 seconds
  });
  
  // Get the unread count
  const unreadCount = chats.reduce((total: number, chat: any) => {
    return total + (chat.unreadCustomer || 0);
  }, 0);
  
  // Just update the reference to current chats without showing toast notifications
  useEffect(() => {
    if (chats.length > 0 && user) {
      // Update reference to current chats
      previousChatsRef.current = JSON.parse(JSON.stringify(chats));
    }
  }, [chats, user]);
  
  return null; // This is a notification component, so it doesn't render anything
};