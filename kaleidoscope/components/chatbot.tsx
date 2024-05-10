"use client"
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ content: string; type: string }>>([
    { content: 'Hi there 👋 How can I help you today?', type: 'incoming' }
  ]);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleUserMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendChat = () => {
    if (!userMessage.trim()) return;

    setChatMessages(prevMessages => [
      ...prevMessages,
      { content: userMessage.trim(), type: 'outgoing' },
      { content: 'Thinking...', type: 'incoming' }
    ]);

    setUserMessage('');

    // You can replace this setTimeout with your actual API call
    setTimeout(() => {
      setChatMessages(prevMessages => {
        const lastMessageIndex = prevMessages.length - 1;
        prevMessages[lastMessageIndex].content = 'Response from the API'; // Replace with actual API response
        return [...prevMessages];
      });
    }, 600);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  const handleMinimizeChatbot = () => {
    setIsChatbotOpen(true);
  };

  return isChatbotOpen ? (
    <div className="fixed bottom-4 right-4 bg-white border-2 rounded-xl w-96 h-96 overflow-y-auto">
      <header className="flex justify-between items-center px-4 py-2 bg-purple-500 text-white rounded-t-xl">
        <div className="flex items-center gap-x-2">
          <Image src="chatbot.svg" alt="bot" width={40} height={40} />
          <h2 className="font-bold">Chatbot</h2>
        </div>
        <button className="close-btn material-symbols-outlined" onClick={handleCloseChatbot}>
          <Image src="close.svg" alt="close" width={20} height={20} />
        </button>
      </header>
      <ul className="max-h-72 p-4 items-center space-y-2 overflow-y-auto ">
        {chatMessages.map((message, index) => (
          <li
            key={index}
            className={`chat ${message.type === 'outgoing' ? 'outgoing' : 'incoming'}`}
          >
            {message.type === 'outgoing' ? (
              <div className="flex items-center justify-end">                 
                <p className="p-2 rounded-2xl bg-blue-500 text-white break-all">
                  {message.content}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-start">
                <div className="flex items-center justify-center">
                  <Image src="chatbot.svg" alt="chatbot" width={45} height={45} />
                </div>
                <p className="p-2 rounded-2xl bg-purple-500 text-white break-all">
                  {message.content}
                </p>
              </div>
            )}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <div className="flex items-center border-t border-gray-300 rounded-b-xl absolute bottom-0 left-0 right-0">
        <textarea
          className="flex-1 mr-2 resize-none border-none focus:outline-none p-1 text-left align-middle h-12"
          placeholder="Enter a message..."
          value={userMessage}
          onChange={handleUserMessageChange}
        />
        <button 
          className="material-symbols-rounded focus:outline-none p-3 items-center justify-center rounded-full"
          onClick={handleSendChat}
        >
          <Image src="send.svg" alt="send" width={20} height={20} />
        </button>
      </div>
    </div>
  ) : (
    <div className="fixed bottom-4 right-4">
      <button className="chatbot-toggler bg-purple-500 text-white rounded-full h-12 w-12 flex items-center justify-center focus:outline-none" onClick={handleMinimizeChatbot}>
        <div className='material-symbols-outlined'>
          <Image src="chatbot.svg" alt="Chatbot" width={60} height={60} />
        </div>
      </button>
    </div>
  );
};

export default Chatbot;
