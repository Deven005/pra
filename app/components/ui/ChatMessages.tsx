"use client";

import { Virtuoso } from "react-virtuoso";
import { MessageBubble } from "./MessageBubble";
import { useChatStore } from "@/app/stores/chat/chat.store";

export function ChatMessages() {
  const currentUser = useChatStore((state) => state.currentUser);
  const selectedId = useChatStore((state) => state.selectedConversationId);
  const messages = useChatStore((state) =>
    selectedId ? state.messages[selectedId] : [],
  );

  if (!selectedId) return null;

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
        <p className="bg-white px-4 py-1.5 rounded-full shadow-sm text-sm text-gray-500">
          No messages yet. Send a message to start the chat.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#f0f2f5]">
      {/* 
        Virtuoso requires the parent to have a defined height. 
        flex-1 on the wrapper and h-full on Virtuoso achieves this.
      */}
      <Virtuoso
        className="h-full w-full px-6 py-4"
        data={messages}
        // Automatically start at the bottom of the list
        initialTopMostItemIndex={messages.length - 1}
        // Automatically scroll down smoothly when a new message is added
        followOutput="smooth"
        itemContent={(index, msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUser?.id}
          />
        )}
      />
    </div>
  );
}
