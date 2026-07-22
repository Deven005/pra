"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { useChatStore } from "@/app/stores/chat/chat.store";

export function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const selectedId = useChatStore((state) => state.selectedConversationId);
  const sendMessage = useChatStore((state) => state.sendMessage);

  // Auto-focus when the selected chat changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  if (!selectedId) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border-t flex items-end gap-2 flex-shrink-0"
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-100 rounded-full px-6 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center h-[48px] w-[48px]"
      >
        <SendHorizontal className="w-5 h-5 ml-[-2px]" />
      </button>
    </form>
  );
}
