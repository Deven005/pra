# Next.js Client-Side Chat Application

A high-performance, fully typed, 1-to-1 client-side chat application built with Next.js (App Router), Zustand, and Tailwind CSS. This project operates entirely in the browser without a backend, demonstrating advanced client-side state management, persistence, and DOM virtualization.

## 🚀 Features

- **Zero-Backend Architecture**: All state is managed locally in the browser using Zustand.
- **Persistent State**: Chat history, conversations, and users are saved to `localStorage`. Refreshing or reopening the browser restores the chat seamlessly.
- **Cross-Tab Synchronization**: Real-time communication across multiple browser tabs using native `StorageEvent` listeners. Open Tab 1 as "John" and Tab 2 as "Emma" to chat in real-time.
- **Infinite Loop Prevention**: Smart state diffing ensures cross-tab updates don't trigger cyclical renders.
- **DOM Virtualization**: Utilizes `react-virtuoso` to only render visible messages. The app maintains 60fps even with a history of 10,000+ messages of dynamic heights.
- **Smart Auto-Scrolling**: Intelligently snaps to the latest message on load, and smoothly scrolls when new messages arrive.
- **Modern UI**: Lightweight WhatsApp/Telegram-style interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with Persist Middleware)
- **Virtualization**: React Virtuoso
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js and `pnpm` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd my-chat-app
   ```
