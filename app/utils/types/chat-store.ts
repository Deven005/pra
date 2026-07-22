import { Conversation } from "./message/conversation";
import { Message } from "./message/message";
import { User } from "./user";

export interface ChatState {
  currentUser: User | null;
  users: User[];
  conversations: Record<string, Conversation>;
  messages: Record<string, Message[]>;
  selectedConversationId: string | null;
}

export interface ChatActions {
  setCurrentUser: (userId: string) => void;
  selectConversation: (conversationId: string) => void;
  sendMessage: (content: string) => void;
}

export type ChatStore = ChatState & ChatActions;
