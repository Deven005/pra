"use client";

import { useChatStore } from "@/app/stores/chat/chat.store";

export function ChatHeader() {
  const currentUser = useChatStore((state) => state.currentUser);
  const users = useChatStore((state) => state.users);
  const conversations = useChatStore((state) => state.conversations);
  const selectedId = useChatStore((state) => state.selectedConversationId);

  if (!currentUser || !selectedId) return null;
  const conversation = conversations[selectedId];
  const otherUserId = conversation.participantIds.find(
    (id) => id !== currentUser.id,
  );
  const otherUser = users.find((u) => u.id === otherUserId);

  if (!otherUser) return null;

  return (
    <div className="h-16 border-b bg-white flex items-center px-6 shadow-sm z-10 flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4">
        {otherUser.avatar}
      </div>
      <div>
        <h2 className="font-semibold text-gray-900">{otherUser.name}</h2>
        <span className="text-xs text-green-500 font-medium">Online</span>
      </div>
    </div>
  );
}
