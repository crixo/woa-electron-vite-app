import React, { useState, useRef, useEffect } from 'react';
import { useLayout } from '../contexts/LayoutContext';
import { DateTime } from "luxon";

export default function ChatInterface() {
  const newChat = [
    { id: 1, text: "Hello! How can I help you today?", sender: "bot", timestamp: new Date() },
  ]
  const [messages, setMessages] = useState(newChat);
  const [inputText, setInputText] = useState('');
  const [conversationId, setConversationId] = useState( DateTime.utc().toFormat("yyyy-MM-dd_HH-mm-ss"));
  const messagesEndRef = useRef(null);
  const { setBottomSection } = useLayout();
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    // This page has a custom bottom section instead of chat input
    setBottomSection(
      <div 
        className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4"
        style={{ height: '80px', flexShrink: 0 }}
      >
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '44px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() && isLoading}
            className={`p-3 rounded-xl transition-all ${
              inputText.trim() && !isLoading
                ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    );

    return () => {
      setBottomSection(null)
    }
  }, [inputText, setInputText, setBottomSection]);  

  const handleNewChat = async () => {
    setIsLoading(true);
    setLoadingMessage('Calling API...');

    try {
      console.log('Starting new chat...');

      setMessages([])

      const newConversationId = await dal.startConversation()
      // await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate a 2-second delay
      // const newConversationId = 'test'

      setConversationId(newConversationId)
      console.log('conversation started with id:'+newConversationId)
      
      // For demo purposes, we'll show an alert
      setMessages(newChat)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };  

  const handleSendMessage = async () => {
    setIsLoading(true);
    setLoadingMessage('Calling API...');

    try {
      if (inputText.trim()) {
        const newUserMessage = {
          id: messages.length + 1,
          text: inputText,
          sender: "user",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');

        console.log('sending question in conversation id:'+conversationId)

        const answer = await dal.askToLLM(conversationId, inputText)
        // await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate a 2-second delay
        // const answer = 'test answer'

        console.log('Bot answer: '+answer)
        
        // Simulate bot response
        // setTimeout(() => {
          const botResponse = {
            id: messages.length + 2,
            text: answer,
            sender: "bot",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
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

  const LoadingOverlay = ({ isVisible, message = 'Loading...' }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg p-8 flex flex-col items-center shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
        <p className="text-lg font-medium text-gray-800 dark:text-gray-100">{message}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Please wait...</p>
      </div>
    </div>
  );
};


  return (
    <>
     {/* Header - Fixed -> make sure containaer does not use py-X otherwise sticky won't work */}
    <div className="fixed top-16 left-0 right-0 z-40 bg-blue-50 dark:bg-blue-900 border-b border-blue-200 dark:border-blue-800 transition-colors duration-300 flex items-center justify-between px-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">Online now</p>

      <button
        onClick={handleNewChat}
        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-gray-300"
        title="Start new chat">
          <i className="fas fa-plus text-lg"></i>
      </button>        
    </div>


    <div id="scrollable-content" class="h-full overflow-y-auto transition-all duration-300">
       {/* Messages Area - Scrollable */}
      <div className="px-6 py-12 space-y-4">
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

      <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
    </div>
    </>
  );
}