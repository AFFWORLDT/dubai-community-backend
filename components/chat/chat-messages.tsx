"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChatById, sendMessage } from '@/service/chat.service';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '@/Providers/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatMessagesProps {
  chatId: string;
  onBack: () => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chatId, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  
  const { data: chat, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChatById(chatId),
    refetchInterval: 5000, // Poll every 5 seconds
  });
  
  const messageMutation = useMutation({
    mutationFn: ({ chatId, message }: { chatId: string; message: string }) => 
      sendMessage(chatId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      queryClient.invalidateQueries({ queryKey: ['customerChats'] });
    },
  });
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    messageMutation.mutate({ chatId, message: newMessage.trim() });
    setNewMessage('');
  };
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chat?.messages?.length]);
  
  const getOwnerName = () => {
    if (!chat?.owner) return 'Property Owner';
    return `${chat.owner.firstName || ''} ${chat.owner.lastName || ''}`.trim();
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-6 w-[150px]" />
        </div>
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className={`flex ${i % 2 ? 'justify-start' : 'justify-end'}`}>
                <Skeleton className={`h-10 w-[200px] ${i % 2 ? 'rounded-tr-lg' : 'rounded-tl-lg'} rounded-bl-lg rounded-br-lg`} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  const ownerName = getOwnerName();
  const currentUserId = user?._id;
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b flex items-center gap-3 bg-gradient-to-r from-primary/5 to-transparent">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0 hover:bg-primary/10">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarImage src={chat?.owner?.profileImage} />
          <AvatarFallback>{ownerName.slice(0, 2).toUpperCase() || 'OW'}</AvatarFallback>
        </Avatar>
        
        <div>
          <p className="font-medium text-sm">{ownerName}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[180px]">
            {chat?.property?.title || 'Property'}
          </p>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4">
        <div className="space-y-3">
          {chat?.messages?.length === 0 ? (
            <div className="text-center text-muted-foreground py-6">
              <p>No messages yet</p>
              <p className="text-sm">Start a conversation with the property owner</p>
            </div>
          ) : (
            chat?.messages?.map((message: any) => {
              const isCurrentUser = message.senderType === 'BookingUser' && 
                message.sender === currentUserId;
              
              return (
                <div
                  key={message._id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[75%]">
                    <div
                      className={`px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-primary text-primary-foreground rounded-tl-2xl rounded-bl-lg rounded-br-2xl shadow-sm'
                          : 'bg-muted/70 border border-muted-foreground/10 rounded-tr-2xl rounded-bl-2xl rounded-br-lg shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t flex items-center gap-2 bg-muted/30">
        <Textarea
          placeholder="Type a message..."
          className="min-h-[40px] max-h-[120px] border-primary/20 focus:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/30"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button 
          size="icon" 
          onClick={handleSendMessage}
          className="h-9 w-9 bg-primary/90 hover:bg-primary"
          disabled={!newMessage.trim() || messageMutation.isPending}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};