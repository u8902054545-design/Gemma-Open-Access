import React from 'react';
import { User } from 'lucide-react';
import { motion } from 'motion/react';
import { GemmaIcon } from '../GemmaIcon';

type ChatMessageProps = {
  role: 'user' | 'ai';
  content: string;
  isGenerating?: boolean;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isGenerating }) => {
  const isAI = role === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-2 mb-8 ${isAI ? 'items-start' : 'items-end'}`}
    >
      {/* Аватарка и спиннер */}
      <div className="relative flex items-center justify-center w-10 h-10">
        {isAI && isGenerating && (
          <div className="google-spinner" />
        )}
        
        <div className={`z-10 flex items-center justify-center ${!isAI ? 'bg-blue-600 w-8 h-8 rounded-full' : ''}`}>
          {isAI ? (
            <GemmaIcon className="w-7 h-7" />
          ) : (
            <User size={18} className="text-white" />
          )}
        </div>
      </div>

      {/* Контент сообщения */}
      <div 
        className={`max-w-[90%] text-[16px] leading-relaxed ${
          isAI 
            ? 'text-gray-100 px-1' // Сообщение бота прямо на фоне
            : 'bg-blue-600 text-white px-4 py-2 rounded-2xl' // Сообщение юзера в бабле
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
};
