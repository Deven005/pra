"use client";

import { useEffect, useState } from "react";
import { ChatHeader } from "./components/ui/ChatHeader";
import { ChatInput } from "./components/ui/ChatInput";
import { ChatMessages } from "./components/ui/ChatMessages";
import { ChatSidebar } from "./components/ui/ChatSidebar";
import { UserSwitcher } from "./components/ui/UserSwitcher";
import { useChatStore } from "./stores/chat/chat.store";

export default function ChatApp() {
  const [mounted, setMounted] = useState(false);
  const selectedConversationId = useChatStore(
    (state) => state.selectedConversationId,
  );

  useEffect(() => {
    // 1. Manually pull the saved data from localStorage to fix the refresh bug
    useChatStore.persist.rehydrate();
    setMounted(true);

    // 2. Listen for messages sent from OTHER open tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "chat-storage" && e.newValue) {
        try {
          const parsedData = JSON.parse(e.newValue);
          const currentState = useChatStore.getState();

          // PREVENT INFINITE LOOP:
          // Check if the messages actually changed before updating the state
          const incomingMessages = JSON.stringify(parsedData.state.messages);
          const localMessages = JSON.stringify(currentState.messages);

          if (incomingMessages !== localMessages) {
            useChatStore.setState({
              messages: parsedData.state.messages,
              conversations: parsedData.state.conversations,
            });
          }
        } catch (error) {
          console.error("Failed to sync tabs", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <UserSwitcher />

      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />

        <main className="flex-1 flex flex-col min-w-0 bg-[#f0f2f5] border-l">
          {selectedConversationId ? (
            <>
              <ChatHeader />
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white/50 px-6 py-3 rounded-full shadow-sm">
                <p className="text-gray-500 font-medium">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
