"use client";

import { useChatStore } from "@/app/stores/chat/chat.store";
import { formatTime } from "@/app/utils/date";

export function ChatSidebar() {
  const currentUser = useChatStore((state) => state.currentUser);
  const users = useChatStore((state) => state.users);
  const conversations = useChatStore((state) => state.conversations);
  const selectedConversationId = useChatStore(
    (state) => state.selectedConversationId,
  );
  const selectConversation = useChatStore((state) => state.selectConversation);

  if (!currentUser) return null;

  const userConversations = Object.values(conversations)
    .filter((conv) => conv.participantIds.includes(currentUser.id))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="w-80 flex-shrink-0 border-r bg-white flex flex-col h-full">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {userConversations.map((conv) => {
          const otherUserId = conv.participantIds.find(
            (id) => id !== currentUser.id,
          );
          const otherUser = users.find((u) => u.id === otherUserId);

          if (!otherUser) return null;

          const isActive = selectedConversationId === conv.id;

          return (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`w-full text-left p-4 flex items-center gap-3 border-b transition-colors ${
                isActive ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                {otherUser.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {otherUser.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(conv.updatedAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage || "No messages yet"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
