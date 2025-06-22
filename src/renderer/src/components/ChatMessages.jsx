import { useRef, useEffect } from "react"

export const ChatMessages = ({messages}) => {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  useEffect(() => {
      scrollToBottom();
  }, [messages]);    

  return(
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
  </div>        
  )
}