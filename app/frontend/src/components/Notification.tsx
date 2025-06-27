"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Interface untuk notification
interface Notification {
  id: number;
  type: "investment" | "message" | "system" | "return";
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

// Mock data notifications
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "investment",
    title: "New Investment Opportunity",
    description: "AI-powered Drug Discovery project is now available for funding",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "return",
    title: "Investment Return",
    description: "You received 4.8 ICP from NLP Research Project",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    description: "Dr. Sarah Chen sent you a research update",
    time: "3 hours ago",
    read: true,
    avatar: "/avatar-placeholder.jpg"
  },
  {
    id: 4,
    type: "system",
    title: "System Update",
    description: "Your profile has been successfully verified",
    time: "1 day ago",
    read: true,
  },
  {
    id: 5,
    type: "investment",
    title: "Investment Milestone",
    description: "Quantum Computing Research reached 75% funding goal",
    time: "2 days ago",
    read: true,
  }
];

interface NotificationDropdownProps {
  className?: string;
  name?: string;
  iconName?: string;
  isActive?: boolean;
  onToggle?: () => void;
}

export function NotificationDropdown({ 
  className = "", 
  name, 
  iconName, 
  isActive = false,
  onToggle 
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "investment":
        return "💰";
      case "message":
        return "💬";
      case "system":
        return "⚙️";
      case "return":
        return "📈";
      default:
        return "🔔";
    }
  };

  // Get notification color
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "investment":
        return "bg-blue-500";
      case "message":
        return "bg-green-500";
      case "system":
        return "bg-gray-500";
      case "return":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          onToggle?.(); // Call parent's toggle function
        }}
        className={`${isActive || isOpen ? "p-3 bg-gradient-to-b from-[#A7C4EC]/40 to-[#5F6F86]/40 rounded-full cursor-pointer hover:-translate-y-0.5" : "p-3 rounded-full cursor-pointer hover:-translate-y-0.5"}`}
      >
        <div className="relative">
          <Image
            src="/bell_ring.svg"
            alt="Notifications"
            width={30}
            height={30}
            className="opacity-80 hover:opacity-100"
          />
          
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon or Avatar */}
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {notification.title.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                          <span className="text-white text-sm">
                            {getNotificationIcon(notification.type)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-400 text-4xl mb-2">🔔</div>
                <p className="text-gray-500 text-sm">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}