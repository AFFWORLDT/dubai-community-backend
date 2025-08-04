
import Cookies from "js-cookie";
import api from "@/utils/ApiUrl";


const CHAT_API_PATH = "api/v1/chat";

const getAuthConfig = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const initializeChat = async (propertyId: string, customerId: string) => {
  try {
    const response = await api.post(
      `${CHAT_API_PATH}/initialize`,
      { propertyId, customerId }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error initializing chat:", error);
    throw error;
  }
};

export const getOwnerChats = async () => {
  try {
    const response = await api.get(
      `${CHAT_API_PATH}/owner`,
      getAuthConfig()
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getting owner chats:", error);
    throw error;
  }
};

export const getCustomerChats = async () => {
  try {
    const response = await api.get(
      `${CHAT_API_PATH}/customer`,
      getAuthConfig()
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getting customer chats:", error);
    throw error;
  }
};

export const getChatById = async (chatId: string) => {
  try {
    const response = await api.get(
      `${CHAT_API_PATH}/${chatId}`,
      getAuthConfig()
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getting chat by ID:", error);
    throw error;
  }
};

export const sendMessage = async (chatId: string, message: string) => {
  try {
    const response = await api.post(
      `${CHAT_API_PATH}/message`,
      { chatId, message },
      getAuthConfig()
    );
    return response.data.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    const response = await api.delete(
      `${CHAT_API_PATH}/${chatId}`,
      getAuthConfig()
    );
    return response.data.data;
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
};