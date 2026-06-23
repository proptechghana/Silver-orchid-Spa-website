'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2, Bot } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your Silver Orchid assistant. I can help you book a session, check availability, or answer any questions about our treatments.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Generate a random session ID on mount
  const sessionId = useRef<string | null>(null);
  
  useEffect(() => {
    if (sessionId.current === null) {
      sessionId.current = Math.random().toString(36).substring(7);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          sessionId: sessionId.current
        }),
      });

      const data = await res.json();
      
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.reply || 'There was an issue processing your request.' };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Connection error. Please try again later.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-[#EBE5D9] text-left overflow-hidden h-full min-h-[500px] flex flex-col">
      <div className="bg-[#F8F5F0] p-6 border-b border-[#EBE5D9] flex items-center gap-4 shrink-0">
        <div className="bg-[#CC7A60] w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-2xl text-[#3A352F]">Silver Orchid Assistant</h3>
          <p className="text-sm font-medium text-[#706B64] flex items-center gap-1.5 mt-1">
             <span className="w-2 h-2 rounded-full bg-green-500 relative block">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             </span>
             Online
          </p>
        </div>
      </div>
      
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white shrink scroll-smooth">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#EFEADD] flex items-center justify-center shrink-0 mt-1">
                 <Bot className="w-4 h-4 text-[#2B4B29]" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.02)] border ${
              message.role === 'user' 
                ? 'bg-[#CC7A60] text-white border-transparent' 
                : 'bg-[#F8F5F0] text-[#3A352F] border-[#EBE5D9]'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
             <div className="w-8 h-8 rounded-full bg-[#EFEADD] flex items-center justify-center shrink-0">
                 <Bot className="w-4 h-4 text-[#2B4B29]" />
             </div>
             <div className="max-w-[80%] rounded-2xl p-4 bg-[#F8F5F0] text-[#3A352F] border border-[#EBE5D9] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-3">
               <Loader2 className="w-4 h-4 animate-spin text-[#CC7A60]" />
               <span className="text-sm text-[#706B64]">Typing...</span>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-[#EBE5D9] shrink-0">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-[#F8F5F0] border border-[#EBE5D9] rounded-full pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-[#CC7A60]/50 outline-none transition-shadow text-[15px] disabled:opacity-50"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-[#CC7A60] hover:bg-[#B86B52] text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-[#CC7A60]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
