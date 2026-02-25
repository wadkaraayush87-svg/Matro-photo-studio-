import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { chatWithGemini } from "../services/gemini";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Namaste! I'm Metro Studio's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithGemini(userMsg);
      setMessages(prev => [...prev, { role: "bot", text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Error connecting to AI. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] h-[500px] glass-card flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 gold-gradient text-dark flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-bold">Studio Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-dark/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user" 
                      ? "bg-gold text-dark rounded-tr-none" 
                      : "bg-white/10 text-white rounded-tl-none border border-white/10"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none animate-pulse text-xs">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-dark-soft">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gold outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-2 rounded-lg gold-gradient text-dark disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full gold-gradient text-dark shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}
