import { ChatStore } from "@/app/utils/types/chat-store";
import { Conversation } from "@/app/utils/types/message/conversation";
import { User } from "@/app/utils/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const DEMO_USERS: User[] = [
  { id: "1", name: "John Doe", avatar: "JD" },
  { id: "2", name: "Emma Wilson", avatar: "EW" },
];

const INITIAL_CONVERSATION: Conversation = {
  id: "conv_1_2",
  participantIds: ["1", "2"],
  updatedAt: Date.now(),
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      currentUser: DEMO_USERS[0],
      users: DEMO_USERS,
      conversations: { [INITIAL_CONVERSATION.id]: INITIAL_CONVERSATION },
      messages: {},
      selectedConversationId: null,

      setCurrentUser: (userId: string) => {
        const user = get().users.find((u) => u.id === userId) || null;
        set({ currentUser: user });
      },

      selectConversation: (conversationId: string) => {
        set({ selectedConversationId: conversationId });
      },

      sendMessage: (content: string) => {
        const { currentUser, selectedConversationId, conversations, messages } =
          get();
        if (!currentUser || !selectedConversationId || !content.trim()) return;

        const newMessage = {
          id: crypto.randomUUID(),
          conversationId: selectedConversationId,
          senderId: currentUser.id,
          content: content.trim(),
          timestamp: Date.now(),
        };

        const existingMessages = messages[selectedConversationId] || [];

        set({
          messages: {
            ...messages,
            [selectedConversationId]: [...existingMessages, newMessage],
          },
          conversations: {
            ...conversations,
            [selectedConversationId]: {
              ...conversations[selectedConversationId],
              lastMessage: newMessage.content,
              updatedAt: newMessage.timestamp,
            },
          },
        });
      },
    }),
    {
      name: "chat-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // <-- ADD THIS: Prevents Next.js from wiping state on refresh
      // ONLY save the database entities, NOT the active UI state
      partialize: (state) => ({
        messages: state.messages,
        conversations: state.conversations,
        users: state.users,
      }),
    },
  ),
);
