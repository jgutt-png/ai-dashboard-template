'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { StaticChatInput } from '@/components/ui/static-chat-input';
import { LightBlueGradient } from '@/components/ui/light-blue-gradient';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';

const placeholders = [
  "Ask me anything about your data...",
  "How can I help you today?",
  "What would you like to know?",
  "Generate a report for me...",
  "Analyze my sales data...",
  "Create a summary of...",
  "Help me understand...",
  "What trends do you see?",
];

export function AIChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Detect sidebar state by checking DOM elements
  useEffect(() => {
    const detectSidebarState = () => {
      const sidebar = document.querySelector('[data-sidebar="desktop"]') || document.querySelector('.group\\/sidebar-btn');
      if (sidebar) {
        const rect = sidebar.getBoundingClientRect();
        setSidebarOpen(rect.width > 100); // If wider than 100px, it's open
      }
    };

    // Initial check
    detectSidebarState();

    // Set up observer for sidebar changes
    const observer = new MutationObserver(detectSidebarState);
    const targetNode = document.body;
    observer.observe(targetNode, { childList: true, subtree: true, attributes: true });

    // Also listen for window resize
    window.addEventListener('resize', detectSidebarState);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', detectSidebarState);
    };
  }, []);
  
  // Calculate the left offset based on sidebar state
  const getLeftOffset = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) { // md breakpoint
      return sidebarOpen ? 316 : 86; // 300px + 16px margin OR 70px + 16px margin
    }
    return 0; // Mobile - no sidebar offset
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      // Only trigger transition animation if this is the first message
      const isFirstMessage = messages.length === 0;
      
      if (isFirstMessage) {
        // Start transition animation for first message only
        setIsTransitioning(true);
        
        // Add message after a slight delay to allow transition to start
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'user', content: input }]);
          setIsTransitioning(false);
        }, 400); // Delay for transition effect
        
        // Add AI response
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'ai', content: `I received your message: "${input}". This is where I would process your request and provide an AI response.` }]);
        }, 900);
      } else {
        // For subsequent messages, add immediately without transition
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        
        // Add AI response
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'ai', content: `I received your message: "${input}". This is where I would process your request and provide an AI response.` }]);
        }, 1000);
      }
      
      setInput("");
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Background Gradient - only shows in initial state */}
      <AnimatePresence>
        {messages.length === 0 && !isTransitioning && (
          <LightBlueGradient key="background-gradient" />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {messages.length === 0 && !isTransitioning ? (
          /* Centered Empty State */
          <motion.div
            key="empty-state"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-full p-6 relative z-10"
          >
            <div className="text-center max-w-2xl w-full">
              <motion.h1 
                initial={{ y: 0 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
              >
                Welcome to BΛSE AI
              </motion.h1>
              <motion.div 
                initial={{ y: 0, scale: 1 }}
                exit={{ 
                  y: "calc(50vh + 100px)", 
                  scale: 1.05,
                  transition: { duration: 0.4, ease: "easeInOut", delay: 0.15 }
                }}
                className="max-w-2xl mx-auto"
              >
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
              </motion.div>
            </div>
          </motion.div>
        ) : null}

        {/* Transitioning State */}
        {isTransitioning && (
          <motion.div
            key="transition-state"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-full p-6"
          >
            <div className="text-center max-w-2xl w-full">
              <motion.h1 
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
              >
                Welcome to BΛSE AI
              </motion.h1>
              <motion.div 
                initial={{ y: 0, scale: 1 }}
                animate={{ 
                  y: "calc(50vh + 100px)", 
                  scale: 1.05
                }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.05 }}
                className="max-w-2xl mx-auto"
              >
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {messages.length > 0 && !isTransitioning ? (
          /* Chat State */
          <motion.div
            key="chat-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex flex-col h-full"
          >
            {/* Chat Messages Area with proper padding for fixed input */}
            <div className="flex-1 overflow-auto p-6 pb-36">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.15 + (index * 0.05) }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm sm:text-base">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Fixed Input Area - Always at bottom when there are messages */}
      <AnimatePresence>
        {messages.length > 0 && !isTransitioning && (
          <motion.div
            key="fixed-input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.2 }}
            className="fixed bottom-0 p-6 pb-8 bg-transparent"
            style={{
              left: `${getLeftOffset()}px`,
              right: 0,
            }}
          >
            <div className="max-w-4xl mx-auto">
              <StaticChatInput
                placeholder="Ask me anything..."
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}