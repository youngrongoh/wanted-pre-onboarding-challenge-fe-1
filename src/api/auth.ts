import http, { attachTokenOnReqestHeader } from './http';

interface HttpSignIn {
  Request: {
    email: string;
    password: string;
  };
  Response: {
    message: string;
    token: string;
  };
}

export const signIn = async (params: HttpSignIn['Request']): Promise<HttpSignIn['Response']> => {
  const res = await http.post('/users/login', params);

  if (res.status === 200) {
    attachTokenOnReqestHeader(res.data.token);
  }

  return res.data;
}

interface HttpSignUp {
  Request: {
    email: string;
    password: string;
  };
  Response: {
    message: string;
    token: string;
  };
}

export const signUp = async (params: HttpSignUp['Request']): Promise<HttpSignUp['Response']>=> {
  const res = await http.post('/users/create', params);
  return res.data;
}