import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { signIn, signUp } from '../api/auth';
import { ReturnData } from '../const/return';
import { useStorage } from '../context/storage';

interface UseAuthData {
  auth: {
    email?: string;
    isSignedIn: boolean;
  };
  token: string;
}

const defaultValue = { isSignedIn: false };

export const useAuth = () => {
  const storage = useStorage<['auth', 'token'], UseAuthData>(['auth', 'token']);

  const { mutateAsync: requestSignIn } = useMutation(['signIn'], (params: Parameters<typeof signIn>[0]) => signIn(params));
  const { mutateAsync: requestSignUp } = useMutation(['signUp'], (params: Parameters<typeof signUp>[0]) => signUp(params));

  const _signIn = async (data: Parameters<typeof requestSignIn>[0]) => {
    let responseData;
    try {
      responseData = await requestSignIn(data);
    } catch (error: any) {
      console.log(error.message);
      return new ReturnData('fail', error.message);
    }

    updateAuthData(data.email, responseData.token);
    return new ReturnData('success', responseData.message);
  }

  const _signUp = async (data: Parameters<typeof requestSignUp>[0]) => {
    let responseData;
    try {
      responseData = await requestSignUp(data);
    } catch (error: any) {
      console.error(error.message);
      return new ReturnData('fail', error.message);
    }

    updateAuthData(data.email, responseData.token);
    return new ReturnData('success', responseData.message);
  }

  const signOut = () => {
    storage.set('auth', defaultValue);
    storage.remove('token');
  }

  const updateAuthData = (email: string, token: string) => {
    storage.set('auth', { email, isSignedIn: true });
    storage.set('token', token);
  }

  const _data = useMemo(() => {
    return storage.data?.auth || defaultValue;
  }, [storage]);

  return {
    data: _data,
    signIn: _signIn,
    signUp: _signUp,
    signOut
  };
}