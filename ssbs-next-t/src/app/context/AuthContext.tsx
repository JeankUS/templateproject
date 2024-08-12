"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, register as registerService } from '../services/auth';

interface AuthContextType {
  user: { token: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullname: string, email: string, mobile: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password);
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      router.push('/');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al iniciar sesión');
    }
  };

  const register = async (fullname: string, email: string, mobile: string, password: string) => {
    try {
      const data = await registerService(fullname, email, mobile, password);
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      router.push('/');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al registrarse');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
