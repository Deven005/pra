"use client";

import { useChatStore } from "@/app/stores/chat/chat.store";

export function UserSwitcher() {
  const users = useChatStore((state) => state.users);
  const currentUser = useChatStore((state) => state.currentUser);
  const setCurrentUser = useChatStore((state) => state.setCurrentUser);

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-white border-b shadow-sm w-full z-10">
      <span className="text-sm font-medium text-gray-500">Current User:</span>
      <div className="flex gap-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setCurrentUser(user.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              currentUser.id === user.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
}
