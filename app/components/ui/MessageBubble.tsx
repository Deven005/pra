import { memo } from "react";
import { formatTime } from "@/app/utils/date";
import { Message } from "@/app/utils/types/message/message";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble = memo(function MessageBubble({
  message,
  isOwn,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex w-full ${isOwn ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm ${
          isOwn
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white border text-gray-800 rounded-bl-sm"
        }`}
      >
        <p className="text-[15px] leading-relaxed break-words">
          {message.content}
        </p>
        <span
          className={`text-[11px] block mt-1 ${
            isOwn ? "text-blue-100 text-right" : "text-gray-400 text-left"
          }`}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
});
