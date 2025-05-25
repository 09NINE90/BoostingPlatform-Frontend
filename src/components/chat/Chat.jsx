import React, { useState, useRef, useEffect } from 'react'
import {Button} from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome in сhat!', sender: 'system', isOwn: false, timestamp: new Date().toLocaleTimeString() },
    { id: 2, text: 'Hi, i am booster', sender: 'executor', isOwn: false, timestamp: new Date().toLocaleTimeString() },
    { id: 3, text: 'I have some questions.', sender: 'client', isOwn: true, timestamp: new Date().toLocaleTimeString() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Автоматическая прокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Отправка нового сообщения
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'client', // В реальном приложении это будет текущий пользователь
      isOwn: true, // Сообщение от текущего пользователя
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  // Обработка нажатия клавиши Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='w-full shadow-2xl rounded-2xl bg-surface m-3 flex flex-col h-[600px]'>
      {/* Заголовок чата */}
      <div className="bg-primary text-white p-4 rounded-t-2xl">
        <h2 className="text-xl font-bold"> Order Chat</h2>
      </div>
      
      {/* Область сообщений */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${
              message.isOwn
                ? 'justify-end' 
                : message.sender === 'system' 
                  ? 'justify-center' 
                  : 'justify-start'
            }`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'system'
                  ? 'bg-gray-700 text-white text-center' 
                  : message.isOwn
                    ? 'bg-green-500 text-white rounded-tr-none' 
                    : 'bg-blue-500 text-white rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs text-gray-200">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Ввод сообщения */}
      <div className="border-t border-gray-300 p-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          color="secondary"
          className="text-white px-4 py-2 rounded-r-lg focus:outline-none"
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export default Chat