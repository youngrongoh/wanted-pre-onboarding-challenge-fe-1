import { createContext, useContext, useMemo } from 'react'
import { useMutation } from '@tanstack/react-query';
import useLocalStorage from '../hooks/useLocalStorage';
import { signIn, signUp } from '../api/auth';
import { ReturnData } from '../const/return';

type AuthContextType = {
  email?: string;
  isSignedIn: boolean;
};

const defaultValue = { isSignedIn: false };

const AuthContext = createContext<AuthContextType>(defaultValue);

interface IAuthContextProvider {
  children: React.ReactElement;
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const { data } = useLocalStorage('auth');
  
  const auth = useMemo(() => {
    if (data && 'email' in data) {
      return { ...data, isSignedIn: true };
    } else {
      return defaultValue;
    }
  }, [data]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const storage = useLocalStorage(['auth', 'token']);
  
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

  return {
    data: auth,
    signIn: _signIn,
    signUp: _signUp,
    signOut
  };
}