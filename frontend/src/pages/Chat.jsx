import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import { getSocket } from '../socket.js';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/messages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();

    const socket = getSocket();
    const handleNewMessage = (msg) => {
      if (String(msg.student_id) === String(userId)) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [userId, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    getSocket().emit('send_message', { text });
    setDraft('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 flex flex-col h-[calc(100vh-160px)]">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-1">Messages</h1>
      <p className="text-sm text-[#898781] mb-4">Chat with the university admin</p>

      <div className="flex-1 bg-[#E6F0FA] rounded-xl p-4 shadow-md overflow-y-auto flex flex-col gap-2">
        {isLoading && <p className="text-[#1F386B] text-center">Loading messages...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!isLoading && !error && messages.length === 0 && (
          <p className="text-[#898781] text-center my-auto">No messages yet — say hello!</p>
        )}

        {messages.map((msg) => {
          const isMine = msg.sender_role === 'student';
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  isMine ? 'bg-[#1F386B] text-white rounded-br-sm' : 'bg-white text-[#1F386B] rounded-bl-sm'
                }`}
              >
                {!isMine && <p className="text-xs font-semibold text-[#898781] mb-0.5">Admin</p>}
                <p>{msg.message_text}</p>
                <p className={`text-[10px] mt-1 ${isMine ? 'text-white/70' : 'text-[#898781]'}`}>
                  {new Date(msg.created_at).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2 mt-4">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-[#1F386B]/30 rounded-full focus:outline-none focus:border-[#1F386B]"
        />
        <button
          type="submit"
          className="bg-[#1F386B] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2A4A8C] transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
