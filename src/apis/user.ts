import axios from 'axios';
import { LoginFormData, RegisterFormData } from '../types/UserTypes';
import tokenInstance from './tokenInstance';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (formData: RegisterFormData) => {
  const response = await axios.post(`${baseUrl}/auth/signup`, formData);
  return response;
};

export const loginUser = async (formData: LoginFormData) => {
  const response = await axios.post(`${baseUrl}/auth/signin`, formData);
  return response;
};

export const refreshUserTokens = async (refreshToken: string) => {
  const response = await axios.post(
    `${baseUrl}/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }
  );
  return response;
};

export const getUser = async () => {
  const response = await tokenInstance.get(`${baseUrl}/auth/users/me`);
  return response;
};

export const testUserToken = async (accessToken: string) => {
  const response = await axios.post(`${baseUrl}/auth/tokenTest`, accessToken);
  return response;
};
