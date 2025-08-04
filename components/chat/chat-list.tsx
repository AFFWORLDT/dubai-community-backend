"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatListProps {
  chats: any[];
  isLoading: boolean;
  onSelectChat: (chatId: string) => void;
  showAll?: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  isLoading,
  onSelectChat,
  showAll = false,
}) => {
  const filteredChats = showAll
    ? chats
    : chats.filter((chat) => chat.lastMessage);

  const sortedChats = [...filteredChats].sort(
    (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
  );

  if (isLoading) {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      ));
  }

  if (sortedChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-muted-foreground">
        <p>No messages yet</p>
        <p className="text-sm">Your conversations will appear here</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {sortedChats.map((chat) => {
        const ownerName = `${chat.owner?.firstName || ''} ${chat.owner?.lastName || ''}`.trim();
        const propertyTitle = chat.property?.title || 'Property';
        const lastMessageTime = chat.lastMessageTime
          ? formatDistanceToNow(new Date(chat.lastMessageTime), { addSuffix: true })
          : '';
        
        return (
          <div
            key={chat._id}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectChat(chat._id)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={chat.owner?.profileImage} />
              <AvatarFallback>
                {ownerName.slice(0, 2).toUpperCase() || 'OW'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium truncate">{ownerName || 'Property Owner'}</p>
                <span className="text-xs text-muted-foreground">{lastMessageTime}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{propertyTitle}</p>
              <p className="text-sm truncate">{chat.lastMessage || 'Start a conversation'}</p>
            </div>
            
            {chat.unreadCustomer > 0 && (
              <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                {chat.unreadCustomer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};