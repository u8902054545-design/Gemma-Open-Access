import React from 'react';
import { AnimatePresence } from 'motion/react';
import { useChat } from './hooks/useChat';
import { useAuth } from './hooks/useAuth'; // Импортируем твой хук
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import Snackbar from './components/Snackbar';
import Login from './components/Login';

export default function App() {
  const { user, loading, signInWithGoogle } = useAuth(); // Берем данные об игроке
  
  const {
    messages,
    input,
    setInput,
    selectedModel,
    setSelectedModel,
    isDropdownOpen,
    setIsDropdownOpen,
    isTyping,
    messagesEndRef,
    handleSend,
    handleKeyDown,
    models,
    snackbarMessage,
    isSnackbarOpen,
    setIsSnackbarOpen
  } = useChat();

  // 1. Пока Supabase проверяет сессию, можно показать пустой черный экран или спиннер
  if (loading) {
    return <div className="min-h-screen bg-black" />;
  }

  // 2. Если пользователя нет — показываем экран Login
  if (!user) {
    return <Login onLoginSuccess={signInWithGoogle} />;
  }

  // 3. Если пользователь вошел — показываем чат
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <ChatHeader />

      <main className="flex-1 overflow-y-auto p-6 max-w-4xl w-full mx-auto flex flex-col">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isGenerating={isTyping && index === messages.length - 1 && msg.role === 'ai'}
            />
          ))}

          {isTyping && <TypingIndicator />}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </main>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        isTyping={isTyping}
        models={models}
      />

      <Snackbar
        message={snackbarMessage}
        isOpen={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
      />

      <div className="h-[140px] w-full flex-shrink-0" />
    </div>
  );
}
