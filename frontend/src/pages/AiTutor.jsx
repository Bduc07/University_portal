import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import { getSocket } from '../socket.js';

const AiTutor = () => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/ai-chat`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching AI chat history:', err);
        setError('Failed to load conversation history.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();

    const socket = getSocket();

    const handleUserMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleChunk = ({ delta }) => {
      setIsStreaming(true);
      setError('');
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant' && last.pending) {
          const updated = [...prev];
          updated[updated.length - 1] = { ...last, content: last.content + delta };
          return updated;
        }
        return [...prev, { id: 'pending', role: 'assistant', content: delta, pending: true }];
      });
    };

    const handleDone = (msg) => {
      setIsStreaming(false);
      setMessages((prev) => {
        const withoutPending = prev.filter((m) => !m.pending);
        return [...withoutPending, msg];
      });
    };

    const handleError = ({ error: message }) => {
      setIsStreaming(false);
      setError(message);
      setMessages((prev) => prev.filter((m) => !m.pending));
    };

    socket.on('ai_chat_message', handleUserMessage);
    socket.on('ai_chat_chunk', handleChunk);
    socket.on('ai_chat_done', handleDone);
    socket.on('ai_chat_error', handleError);

    return () => {
      socket.off('ai_chat_message', handleUserMessage);
      socket.off('ai_chat_chunk', handleChunk);
      socket.off('ai_chat_done', handleDone);
      socket.off('ai_chat_error', handleError);
    };
  }, [token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || isStreaming) return;
    getSocket().emit('ask_ai', { text });
    setDraft('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 flex flex-col h-[calc(100vh-160px)]">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-1">AI Study Assistant</h1>
      <p className="text-sm text-[#898781] mb-4">Ask questions about your course — it'll help you understand, not just hand you answers.</p>

      <div className="flex-1 bg-[#E6F0FA] rounded-xl p-4 shadow-md overflow-y-auto flex flex-col gap-2">
        {isLoading && <p className="text-[#1F386B] text-center">Loading conversation...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!isLoading && !error && messages.length === 0 && (
          <p className="text-[#898781] text-center my-auto">Ask your first question to get started.</p>
        )}

        {messages.map((msg) => {
          const isMine = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  isMine ? 'bg-[#1F386B] text-white rounded-br-sm' : 'bg-white text-[#1F386B] rounded-bl-sm'
                }`}
              >
                {!isMine && <p className="text-xs font-semibold text-[#898781] mb-0.5">AI Tutor</p>}
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.created_at && !msg.pending && (
                  <p className={`text-[10px] mt-1 ${isMine ? 'text-white/70' : 'text-[#898781]'}`}>
                    {new Date(msg.created_at).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
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
          placeholder={isStreaming ? 'Waiting for a reply...' : 'Ask a question about your course...'}
          disabled={isStreaming}
          className="flex-1 px-4 py-2 border border-[#1F386B]/30 rounded-full focus:outline-none focus:border-[#1F386B] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isStreaming}
          className="bg-[#1F386B] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2A4A8C] transition-colors disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AiTutor;
