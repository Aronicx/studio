"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { findUserByRollNumber } from '@/lib/data';

interface AuthContextType {
  loggedInUserId: string | null;
  login: (rollNumber: number, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('loggedInUserId');
    if (storedUserId) {
      setLoggedInUserId(storedUserId);
    }
  }, []);

  const login = (rollNumber: number, password: string): boolean => {
    const user = findUserByRollNumber(rollNumber);
    if (user && user.password === password) {
      sessionStorage.setItem('loggedInUserId', user.id);
      setLoggedInUserId(user.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('loggedInUserId');
    setLoggedInUserId(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUserId, login, logout }}>
      {children}
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
