import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onMoodUpdate: (mood: string) => void;
}

export default function ChatInterface({ onMoodUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your wellness companion. I'm here to support your mental health journey. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mood detection
    if (lowerMessage.includes('stressed') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      onMoodUpdate('stressed');
      return "I hear that you're feeling stressed. That's completely valid, and I'm here to help. Would you like to try a quick breathing exercise? Try the 4-7-8 technique: breathe in for 4, hold for 7, exhale for 8. Repeat 3 times.";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      onMoodUpdate('sad');
      return "I'm sorry you're feeling down. Remember, it's okay to have difficult days. Sometimes, acknowledging our feelings is the first step. Would you like to try a gentle mindfulness exercise or talk about what's on your mind?";
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('wonderful')) {
      onMoodUpdate('happy');
      return "That's wonderful to hear! I'm so glad you're having a good day. Let's build on this positive energy. What's contributing most to your happiness right now?";
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('sleepy')) {
      onMoodUpdate('tired');
      return "Feeling tired can affect our overall well-being. Are you getting enough rest? Sometimes a short mindfulness break can be refreshing. Try focusing on your breath for just 2 minutes.";
    }
    
    if (lowerMessage.includes('meditation') || lowerMessage.includes('mindful')) {
      return "Mindfulness is a wonderful practice! Here's a simple exercise: Find a comfortable position, close your eyes, and focus on your breathing. Notice each inhale and exhale without trying to change it. If your mind wanders, gently bring it back to your breath.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to support you. Remember, seeking help is a sign of strength. You can try breathing exercises, mindfulness meditation, or we can simply talk. If you're in crisis, please reach out to a mental health professional or crisis hotline.";
    }
    
    // Default responses
    const responses = [
      "Thank you for sharing that with me. How does talking about this make you feel?",
      "I appreciate you opening up. What would be most helpful for you right now?",
      "It sounds like you're going through something important. Would you like to explore this further?",
      "Your feelings are valid. What's one small thing that might bring you comfort today?",
      "I'm here to listen. What would you like to focus on in this moment?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg">
      {/* Chat Header */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-t-2xl border-b border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Wellness Companion</h3>
            <p className="text-sm text-gray-600">Always here to listen and support</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <Bot className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.type === 'user' && (
                  <User className="w-4 h-4 text-blue-100 mt-0.5 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-blue-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-white/80 backdrop-blur-sm rounded-b-2xl border-t border-blue-100">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share how you're feeling..."
            className="flex-1 px-4 py-3 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm placeholder-gray-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}