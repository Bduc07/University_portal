import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import { getSocket } from '../socket.js';

const AdminMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // { student_id, student_name }
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingThread, setIsLoadingThread] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const token = localStorage.getItem('token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/messages/conversations`, authHeaders);
      setConversations(response.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations.');
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchConversations();

    const socket = getSocket();
    const handleNewMessage = (msg) => {
      // Keep the open thread live if it matches, and refresh the list
      // preview/order/unread counts either way.
      setMessages((prev) =>
        selectedStudentRef.current && String(msg.student_id) === String(selectedStudentRef.current)
          ? [...prev, msg]
          : prev
      );
      fetchConversations();
    };
    socket.on('new_message', handleNewMessage);

    return () => socket.off('new_message', handleNewMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Socket handler closes over stale state, so track the selected student in a ref too.
  const selectedStudentRef = useRef(null);
  useEffect(() => {
    selectedStudentRef.current = selectedStudent?.student_id ?? null;
  }, [selectedStudent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const openConversation = async (conversation) => {
    setSelectedStudent(conversation);
    setIsLoadingThread(true);
    setError('');
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/messages/${conversation.student_id}`,
        authHeaders
      );
      setMessages(response.data);
      getSocket().emit('join_conversation', conversation.student_id);
      fetchConversations(); // clears the unread badge now that it's been read
    } catch (err) {
      console.error('Error fetching thread:', err);
      setError('Failed to load conversation.');
    } finally {
      setIsLoadingThread(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selectedStudent) return;
    getSocket().emit('send_message', { studentId: selectedStudent.student_id, text });
    setDraft('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-1">Messages</h1>
      <p className="text-sm text-[#898781] mb-6">Conversations with students</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        {/* Conversation list */}
        <div className="bg-[#E6F0FA] rounded-xl shadow-md overflow-y-auto">
          {isLoadingList ? (
            <p className="text-[#1F386B] text-center p-4">Loading...</p>
          ) : conversations.length === 0 ? (
            <p className="text-[#898781] text-center p-4">No conversations yet.</p>
          ) : (
            conversations.map((c) => (
              <button
                key={c.student_id}
                onClick={() => openConversation(c)}
                className={`w-full text-left px-4 py-3 border-b border-white/50 hover:bg-white/60 transition-colors ${
                  selectedStudent?.student_id === c.student_id ? 'bg-white' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#1F386B]">{c.student_name}</span>
                  {c.unread_count > 0 && (
                    <span className="bg-[#d03b3b] text-white text-xs rounded-full px-2 py-0.5">
                      {c.unread_count}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#52514e] truncate mt-0.5">
                  {c.last_sender_role === 'admin' ? 'You: ' : ''}
                  {c.last_message}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Selected thread */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md flex flex-col">
          {!selectedStudent ? (
            <p className="text-[#898781] text-center m-auto">Select a conversation to view messages.</p>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-gray-200 font-semibold text-[#1F386B]">
                {selectedStudent.student_name}
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {isLoadingThread ? (
                  <p className="text-[#1F386B] text-center">Loading...</p>
                ) : (
                  messages.map((msg) => {
                    const isMine = msg.sender_role === 'admin';
                    return (
                      <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                            isMine
                              ? 'bg-[#1F386B] text-white rounded-br-sm'
                              : 'bg-[#E6F0FA] text-[#1F386B] rounded-bl-sm'
                          }`}
                        >
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
                  })
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-gray-200">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a reply..."
                  className="flex-1 px-4 py-2 border border-[#1F386B]/30 rounded-full focus:outline-none focus:border-[#1F386B]"
                />
                <button
                  type="submit"
                  className="bg-[#1F386B] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2A4A8C] transition-colors"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
