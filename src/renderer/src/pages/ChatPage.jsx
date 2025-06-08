import React, { useState, useRef, useEffect } from 'react';
import { useLayout } from '../contexts/LayoutContext';
import { DateTime } from "luxon";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot", timestamp: new Date() },
    // { id: 2, text: "Hi there! I'd like to know about React components.", sender: "user", timestamp: new Date() },
    // { id: 3, text: "Great question! React components are reusable pieces of UI that can manage their own state and lifecycle. They're the building blocks of React applications.", sender: "bot", timestamp: new Date() },
    // { id: 4, text: "That's really helpful! Can you tell me more about state management?", sender: "user", timestamp: new Date() },
    // { id: 5, text: "Absolutely! State management in React can be handled in several ways...", sender: "bot", timestamp: new Date() },
    // { id: 6, text: "What about hooks?", sender: "user", timestamp: new Date() },
    // { id: 7, text: "Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features in functional components.", sender: "bot", timestamp: new Date() },
    // { id: 8, text: "Can you give me an example?", sender: "user", timestamp: new Date() },
    // { id: 9, text: "Sure! The useState hook is one of the most commonly used hooks. It allows you to add state to functional components.", sender: "bot", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [conversationId, setConversationId] = useState( DateTime.now().toISO());
  const messagesEndRef = useRef(null);
  const { setBottomSection } = useLayout();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(() => {
  //   // This page has a custom bottom section instead of chat input
  //   setBottomSection(
  //     <div 
  //       className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4"
  //       style={{ height: '80px', flexShrink: 0 }}
  //     >
  //       <div className="flex items-end space-x-3">
  //         <div className="flex-1">
  //           {/* <textarea
  //             value={inputText}
  //             onChange={(e) => setInputText(e.target.value)}
  //             onKeyPress={handleKeyPress}
  //             placeholder="Type your message..."
  //             className="w-full px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
  //             rows={1}
  //             style={{ minHeight: '44px', maxHeight: '44px' }}
  //           /> */}
  //           <input type='text' 
  //             value={inputText}
  //             onChange={(e) => {setInputText(e.target.value)}}
  //             className="w-full px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600" />
  //         </div>
  //         <button
  //           onClick={handleSendMessage}
  //           disabled={!inputText.trim()}
  //           className={`p-3 rounded-xl transition-all ${
  //             inputText.trim()
  //               ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
  //               : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
  //           }`}
  //         >
  //           Send
  //         </button>
  //       </div>
  //     </div>
  //   );
    
  //   return () => {
  //     setBottomSection(null);
  //   };
  // }, [setBottomSection]);  

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        timestamp: new Date()
      };
      
      // setMessages(prev => [...prev, newUserMessage]);
      setInputText('');
      const answer = dal.askToLLM(conversationId, inputText)
      
      // Simulate bot response
      // setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: answer,
          sender: "bot",
          timestamp: new Date()
        };
      //   setMessages(prev => [...prev, botResponse]);
      // }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {/* Header - Fixed */}
      <div 
        className="bg-white dark:bg-gray-800 px-6 py-2 flex items-center"
        style={{ height: '40px', flexShrink: 0 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">Online now</p>
      </div>

      {/* Messages Area - Scrollable */}
      <div 
        className="px-6 py-4 space-y-4"
        style={{ 
          height: 'calc(100vh - 120px)', 
          flexGrow: 1,
          flexShrink: 1
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-500 dark:bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <div
                className={`text-xs mt-1 text-gray-500 dark:text-gray-400 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm font-medium bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                AI
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      <div>
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            {/* <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '44px' }}
            /> */}
            <input type='text' 
              value={inputText}
              onChange={(e) => {setInputText(e.target.value)}}
              className="w-full px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600" />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-3 rounded-xl transition-all ${
              inputText.trim()
                ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </div>      

    </div>
  );
}