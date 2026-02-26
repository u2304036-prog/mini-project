import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import CourtRoom from "./components/CourtRoom";
import Appointments from "./components/Appointments";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Profile from "./Profile";
import { getCurrentUser, logout as doLogout } from "./utils/auth";
import ModeToggle from "./components/ModeToggle";
import SidebarLogoMenu from "./components/SidebarLogoMenu";
import { User } from "lucide-react";

export default function App() {
  const existing = getCurrentUser();

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: "Hello! I'm NyayaBot — your legal aid assistant. How can I help you today?",
    },
  ]);

  const [currentUser, setCurrentUser] = useState(existing);
  const [view, setView] = useState("chat");
  const [mode, setMode] = useState("nyaya");
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setMessages((m) => [
      ...m,
      {
        id: Date.now() + 1,
        role: "bot",
        text: `I received: "${userMsg.text}".`,
      },
    ]);
    setIsSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const onAuth = (user) => {
    setCurrentUser(user);
    setView("profile");
  };

  const logout = () => {
    doLogout();
    setCurrentUser(null);
    setView("chat");
  };

  return (
    <div className="min-h-screen flex bg-[#0b1020] text-gray-100 relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          inset-y-0 left-0
          z-50
          w-64
          bg-[#0b1220]
          border-r border-gray-800
          p-3
          transform
          transition-transform
          duration-300
          ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <SidebarLogoMenu
          mode={mode}
          setMode={(m) => {
            setMode(m);
            setSidebarOpen(false);
          }}
        />

        {mode !== "court" ? (
          <>
            <button
              onClick={() => setSidebarOpen(false)}
              className="mt-3 mx-2 text-sm w-full text-left px-3 py-2 rounded-md bg-[#062022] hover:bg-[#0b1b26]"
            >
              + New chat
            </button>

            <div className="flex-1 mt-4 overflow-auto px-2">
              <div className="text-xs text-gray-500 mb-2">Recent</div>
              <div className="space-y-1">
                <div className="text-sm px-3 py-2 rounded-md hover:bg-[#081827]">
                  How to file a civil suit
                </div>
                <div className="text-sm px-3 py-2 rounded-md hover:bg-[#081827]">
                  Tenant rights question
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1" />
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-800 bg-[#061028] relative px-4 md:px-6 py-4 md:py-6">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-[#0b1b26]"
          >
            ☰
          </button>

          {/* Right controls (always show profile button so user can login) */}
          <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50">
            <button
              onClick={() => setView("profile")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-[#0b1b26]"
            >
              <User size={16} />
              <span className="hidden sm:inline">{currentUser ? currentUser.name : 'Profile'}</span>
            </button>
          </div>

          {/* Mode toggle */}
          <div className="flex justify-center">
            <ModeToggle mode={mode} setMode={setMode} />
          </div>
        </header>

        {/* Content */}
        {view === "profile" ? (
          <div className="flex-1 overflow-auto p-4">
            <Profile
              user={currentUser}
              onLogout={logout}
              onUpdate={setCurrentUser}
              onClose={() => setView("chat")}
              onSwitch={(v) => setView(v)}
            />
          </div>
        ) : view === 'login' ? (
          <div className="flex-1 overflow-auto p-4">
            <Login onAuth={onAuth} onSwitch={(v) => setView(v)} />
          </div>
        ) : view === 'signup' ? (
          <div className="flex-1 overflow-auto p-4">
            <SignUp onAuth={onAuth} onSwitch={(v) => setView(v)} />
          </div>
        ) : mode === "court" ? (
          <CourtRoom onExit={() => setMode("nyaya")} />
        ) : mode === "appointments" ? (
          <Appointments onClose={() => setMode("nyaya")} />
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4">
              <ChatWindow messages={messages} mode={mode} />
            </div>

            <div className="border-t border-gray-800 bg-[#061028] p-4">
              <div className="max-w-3xl mx-auto flex gap-3">
                <textarea
                  className="flex-1 bg-[#0B1220] resize-none outline-black/20 rounded-md px-3 py-2 text-base focus:ring-2 focus:ring-[#10a37f] focus:ring-offset-1 focus:ring-offset-[#0b1220] placeholder-gray-500"
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Nyaya your queries here..."
                />
                <button
                  onClick={sendMessage}
                  disabled={isSending}
                  className="bg-[#10a37f] text-black px-4 py-2 rounded-md"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
