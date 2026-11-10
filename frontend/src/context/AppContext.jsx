import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentMatch, setCurrentMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Load default flagship 85% match analysis on mount so the user sees the full UI immediately
  useEffect(() => {
    async function loadInitial() {
      try {
        setIsLoading(true);
        const data = await api.getDemoMatch();
        setCurrentMatch(data);
      } catch (err) {
        console.error('Could not load demo match:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitial();
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      currentMatch,
      setCurrentMatch,
      isLoading,
      setIsLoading,
      notifications,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

