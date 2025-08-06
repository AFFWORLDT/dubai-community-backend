"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ChatContextType {
  isChatting: boolean;
  setIsChatting: (chatting: boolean) => void;
  hasActiveChats: boolean;
  setHasActiveChats: (hasChats: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isChatting, setIsChatting] = useState(false);
  const [hasActiveChats, setHasActiveChats] = useState(false);

  // Load chat state from localStorage on mount
  useEffect(() => {
    const wasChatting = localStorage.getItem('isChatting') === 'true';
    if (wasChatting) {
      setIsChatting(true);
    }
  }, []);

  // Save chat state to localStorage when it changes
  useEffect(() => {
    if (isChatting) {
      localStorage.setItem('isChatting', 'true');
    } else {
      localStorage.removeItem('isChatting');
    }
  }, [isChatting]);

  const value = {
    isChatting,
    setIsChatting,
    hasActiveChats,
    setHasActiveChats,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 