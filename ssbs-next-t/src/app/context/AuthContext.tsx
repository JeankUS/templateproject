"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, register as registerService, forgotPassword as recoverPassword, resetPassword as resetPassword } from '../services/auth';
import { Token } from '@mui/icons-material';
import jwt from 'jsonwebtoken';

interface AuthContextType {
  user: { token: string } | null;
  login: (email: string, password: string) => Promise< void>;
  register: (fullname: string, email: string, mobile: string, password: string) => Promise<void>;
  logout: () => void;
  recoverPass: (email: string) => Promise<void>;
  resetPass: (newPassword: string) => Promise<void>;
  loading: boolean;
  require_change_password: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [require_change_password, SetChangePassword] = useState(false);


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
      const decodeToken:any = jwt.decode(data.token)
      SetChangePassword(decodeToken.require_change_password)
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
    router.push('/pages/login');
  };

  //recoverPassword

  
  const recoverPass = async ( email: string) => {
    try {
      const data = await recoverPassword(email);
      console.log(data)
      console.log(`Se envio el email a: ${email}`)
      router.push('/');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al enviar clave de recuperacion');
    }
  };
  
  const resetPass = async ( newPassword: string) => {
    try {
      if(user){
        const decodeToken:any = jwt.decode(user.token)
        const data = await resetPassword(newPassword, decodeToken.iduser);
        router.push('/');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al enviar clave de recuperacion');
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, register, logout,recoverPass,resetPass, loading, require_change_password}}>
      {children}
    </AuthContext.Provider>
  );
};
