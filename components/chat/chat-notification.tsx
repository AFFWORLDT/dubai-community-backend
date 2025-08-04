"use client";

import React, { useEffect, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
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
  
  // Show notification when new messages arrive (not from current user)
  useEffect(() => {
    if (chats.length > 0 && user) {
      const previousChats = previousChatsRef.current;
      const processedMessageIds = new Set<string>();
      
      // Find chats with new messages compared to previous state
      chats.forEach((currentChat: any) => {
        if (currentChat.unreadCustomer > 0) {
          const previousChat = previousChats.find((chat: any) => chat._id === currentChat._id);
          
          // Check if this is a new message (unread count increased)
          if (!previousChat || currentChat.unreadCustomer > previousChat.unreadCustomer) {
            // Get the latest message
            const latestMessage = currentChat.messages && currentChat.messages.length > 0 
              ? currentChat.messages[currentChat.messages.length - 1] 
              : null;
              
            // Only show notification if:
            // 1. The sender is not the current user
            // 2. We haven't already processed this message
            if (latestMessage && 
                latestMessage.sender !== user.id && 
                !processedMessageIds.has(latestMessage._id)) {
              
              // Mark this message as processed
              processedMessageIds.add(latestMessage._id);
              
              const ownerName = currentChat.owner?.firstName 
                ? `${currentChat.owner.firstName} ${currentChat.owner.lastName || ''}` 
                : 'Property Owner';
              
              toast({
                title: `New message from ${ownerName}`,
                description: currentChat.lastMessage,
                duration: 5000,
              });
            }
          }
        }
      });
      
      // Update reference to current chats
      previousChatsRef.current = JSON.parse(JSON.stringify(chats));
    }
  }, [chats, user]);
  
  return null; // This is a notification component, so it doesn't render anything
};