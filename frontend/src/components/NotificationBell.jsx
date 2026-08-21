import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import { API_BASE_URL } from '../config.js';
import { getSocket } from '../socket.js';

const timeAgo = (isoString) => {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/notifications`, authHeaders);
        setNotifications(res.data.notifications);
        setUnreadCount(res.data.unreadCount);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();

    const socket = getSocket();
    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev].slice(0, 30));
      setUnreadCount((prev) => prev + 1);
    };
    socket.on('new_notification', handleNewNotification);

    return () => {
      socket.off('new_notification', handleNewNotification);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = async (notification) => {
    setIsOpen(false);
    if (!notification.is_read) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, is_read: 1 } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      try {
        await axios.patch(`${API_BASE_URL}/api/notifications/${notification.id}/read`, null, authHeaders);
      } catch (err) {
        console.error('Error marking notification read:', err);
      }
    }
    if (notification.link) navigate(notification.link);
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
    setUnreadCount(0);
    try {
      await axios.patch(`${API_BASE_URL}/api/notifications/read-all`, null, authHeaders);
    } catch (err) {
      console.error('Error marking all notifications read:', err);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Notifications"
      >
        <FaBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white text-[#1F386B] rounded-xl shadow-lg overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs text-[#1F386B]/70 hover:text-[#1F386B]">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="text-sm text-[#898781] text-center py-6">No notifications yet</p>
            )}
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleSelect(n)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 flex gap-2 ${
                  !n.is_read ? 'bg-[#E6F0FA]/60' : ''
                }`}
              >
                {!n.is_read && <span className="mt-1.5 h-2 w-2 rounded-full bg-[#1F386B] flex-shrink-0" />}
                <div className={n.is_read ? 'pl-4' : ''}>
                  <p className="text-sm font-medium">{n.title}</p>
                  {n.body && <p className="text-xs text-[#898781] line-clamp-2">{n.body}</p>}
                  <p className="text-[10px] text-[#898781] mt-1">{timeAgo(n.created_at)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
