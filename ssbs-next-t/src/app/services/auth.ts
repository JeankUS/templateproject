import api from './api';

export const register = async (fullname: string, email: string, mobile: string, password: string) => {
  try {

    const response = await api.post('/auth/pages/register', {
      fullname,
      email,
      mobile,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/pages/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/auth/pages/forgotpassword', {email});
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};


export const resetPassword = async (newPassword: string, iduser: number) => {
  try {
    
    const response = await api.post('/auth/pages/resetpassword', {newPassword, iduser});
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};





