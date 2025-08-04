"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatList } from './chat-list';
import { ChatMessages } from './chat-messages';
import { MessageCircle, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCustomerChats } from '@/service/chat.service';
import { useAuthStore } from '@/Providers/auth-provider';

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const { user } = useAuthStore();

  const { data: chats = [], isLoading } = useQuery({
    queryKey: ['customerChats'],
    queryFn: getCustomerChats,
    enabled: !!user,
  });

  return (
    <Card className="fixed top-20 right-6 w-[380px] h-[480px] shadow-xl border-2 border-primary/20 flex flex-col z-50 animate-in slide-in-from-right duration-300">
      <CardHeader className="py-3 px-4 flex flex-row justify-between items-center bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Messages
        </CardTitle>
        <button onClick={onClose} className="hover:bg-gray-100 rounded-full p-1.5 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </CardHeader>
      
      <CardContent className="flex-grow p-0 overflow-hidden">
        {selectedChat ? (
          <ChatMessages 
            chatId={selectedChat} 
            onBack={() => setSelectedChat(null)}
          />
        ) : (
          <Tabs defaultValue="recent" className="w-full h-full flex flex-col">
            <TabsList className="grid grid-cols-2 mx-4 my-3 bg-muted/60">
              <TabsTrigger value="recent" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">Recent</TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">All Chats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="flex-grow overflow-hidden">
              <ScrollArea className="h-[360px]">
                <ChatList 
                  chats={chats}
                  isLoading={isLoading}
                  onSelectChat={(chatId) => setSelectedChat(chatId)}
                />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="all" className="flex-grow overflow-hidden">
              <ScrollArea className="h-[360px]">
                <ChatList 
                  chats={chats} 
                  isLoading={isLoading}
                  onSelectChat={(chatId) => setSelectedChat(chatId)}
                  showAll
                />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};