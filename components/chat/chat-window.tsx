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
import { useChatContext } from './chat-context';

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const { user } = useAuthStore();
  const { setIsChatting } = useChatContext();

  const { data: chats = [], isLoading } = useQuery({
    queryKey: ['customerChats'],
    queryFn: getCustomerChats,
    enabled: !!user,
  });

  const handleClose = () => {
    setIsChatting(false);
    onClose();
  };

  return (
    <Card className="fixed bottom-20 left-2 sm:left-6 w-[calc(100vw-1rem)] sm:w-[380px] h-[400px] sm:h-[480px] shadow-xl border-2 border-primary/20 flex flex-col z-50 animate-in slide-in-from-bottom duration-300">
      <CardHeader className="py-2 sm:py-3 px-3 sm:px-4 flex flex-row justify-between items-center bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden xs:inline">Messages</span>
          <span className="xs:hidden">Chat</span>
        </CardTitle>
        <button onClick={handleClose} className="hover:bg-gray-100 rounded-full p-1 sm:p-1.5 transition-colors">
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
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
            <TabsList className="grid grid-cols-2 mx-3 sm:mx-4 my-2 sm:my-3 bg-muted/60">
              <TabsTrigger value="recent" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs sm:text-sm">Recent</TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs sm:text-sm">All Chats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="flex-grow overflow-hidden">
              <ScrollArea className="h-[300px] sm:h-[360px]">
                <ChatList 
                  chats={chats}
                  isLoading={isLoading}
                  onSelectChat={(chatId) => setSelectedChat(chatId)}
                />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="all" className="flex-grow overflow-hidden">
              <ScrollArea className="h-[300px] sm:h-[360px]">
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