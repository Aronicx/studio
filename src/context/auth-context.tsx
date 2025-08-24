
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { findUserByRollNumber } from '@/lib/data';

interface AuthContextType {
  loggedInUserId: string | null;
  login: (rollNumber: number, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
        const storedUserId = localStorage.getItem('loggedInUserId');
        if (storedUserId) {
          setLoggedInUserId(storedUserId);
        }
    } catch (error) {
        console.error("Could not access localStorage:", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (rollNumber: number, password: string): boolean => {
    const user = findUserByRollNumber(rollNumber);
    if (user && user.password === password) {
      localStorage.setItem('loggedInUserId', user.id);
      setLoggedInUserId(user.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('loggedInUserId');
    setLoggedInUserId(null);
  };
  
  const value = { loggedInUserId, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
