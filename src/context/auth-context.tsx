
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { findUserByRollNumber } from '@/lib/data';

interface AuthContextType {
  loggedInUserId: string | null;
  login: (rollNumber: number, password: string) => Promise<boolean>;
  logout: () => void;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    try {
        const storedUserId = localStorage.getItem('loggedInUserId');
        if (storedUserId) {
          setLoggedInUserId(storedUserId);
        }
    } catch (error) {
        console.error("Could not access localStorage:", error);
    } finally {
        setAuthLoading(false);
    }
  }, []);

  const login = async (rollNumber: number, password: string): Promise<boolean> => {
    setAuthLoading(true);
    const user = await findUserByRollNumber(rollNumber);
    if (user && user.password === password) {
      localStorage.setItem('loggedInUserId', user.id);
      setLoggedInUserId(user.id);
      setAuthLoading(false);
      return true;
    }
    setAuthLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('loggedInUserId');
    setLoggedInUserId(null);
  };
  
  const value = { loggedInUserId, login, logout, authLoading };

  return (
    <AuthContext.Provider value={value}>
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
