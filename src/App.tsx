import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GemmaIcon } from './GemmaIcon';
import { SUPABASE_ENDPOINT } from './config';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

const MODELS = [
  'Gemma 3 1B',
  'Gemma 3 4B',
  'Gemma 3 12B',
  'Gemma 3 27B',
  'Gemma 3n E2B',
  'Gemma 3n E4B',
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Hello! I am Gemma. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: userText };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(SUPABASE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();

      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: data.content
      };

      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'ai',
        content: 'An error occurred. Please try again later.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <header className="p-6 flex justify-between items-center border-b border-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <GemmaIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold animate-gradient text-gradient">
            Gemma Open Access
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 max-w-4xl w-full mx-auto flex flex-col gap-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.role === 'user' ? 'bg-[#0000FF]' : 'bg-[#1a1a1a] border border-[#333]'}`}>
                {msg.role === 'user' ? (
                  <User size={20} />
                ) : (
                  <GemmaIcon className="w-full h-full" />
                )}
              </div>

              <div className={`px-6 py-4 rounded-3xl leading-relaxed ${msg.role === 'user' ? 'bg-[#0000FF] text-white rounded-tr-sm' : 'bg-[#1a1a1a] text-gray-100 border border-[#333] rounded-tl-sm'}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex gap-4 max-w-[85%]"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#1a1a1a] border border-[#333]">
                <GemmaIcon className="w-full h-full" />
              </div>
              <div className="px-6 py-4 rounded-3xl bg-[#1a1a1a] border border-[#333] text-gray-100 rounded-tl-sm flex items-center gap-3">
                <div className="w-2 h-2 rounded-full animate-gradient"></div>
                <div className="w-2 h-2 rounded-full animate-gradient" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full animate-gradient" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      <footer className="w-full max-w-4xl mx-auto fixed bottom-0 left-1/2 -translate-x-1/2">
        <div className="pt-[1px] px-[1px] rounded-t-[32px] animate-gradient input-glow">
          <div className="bg-black rounded-t-[31px] flex flex-col p-3 pb-4">
            
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Gemma..."
                className="flex-1 bg-transparent border-none outline-none resize-none max-h-48 min-h-[44px] px-4 py-3 text-white placeholder-gray-500"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] disabled:opacity-50 rounded-full transition-colors mb-1"
              >
                <Send size={20} className={input.trim() && !isTyping ? "text-[#00FFFF]" : "text-gray-600"} />
              </button>
            </div>

            <div className="relative mt-2 px-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-medium"
              >
                <GemmaIcon className="w-3.5 h-3.5" />
                {selectedModel}
                <ChevronDown size={12} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-4 w-56 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {MODELS.map(model => (
                      <button
                        key={model}
                        onClick={() => {
                          setSelectedModel(model);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-[#252525] flex items-center gap-3 transition-colors text-sm"
                      >
                        <GemmaIcon className="w-4 h-4 flex-shrink-0" />
                        {model}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </footer>
      <div className="h-[140px] w-full flex-shrink-0" />
    </div>
  );
}
