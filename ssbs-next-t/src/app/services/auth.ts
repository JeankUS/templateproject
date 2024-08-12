import api from './api';

export const register = async (fullname: string, email: string, mobile: string, password: string) => {
  try {

    const response = await api.post('/auth/register', {
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
    const response = await api.post('/auth/login', { email, password });

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
