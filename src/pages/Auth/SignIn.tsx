import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message';
import signInValidation from '../../validation/signIn';
import { SIGNIN_FILEDS } from './meta';
import { useAuth } from '../../context/auth';
import useAlert from '../../context/alert';

interface ISignIn {
  goToSignUp: () => void;
}
const SignIn = ({ goToSignUp }: ISignIn) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const alert = useAlert();

  const { control, handleSubmit, formState, trigger } = useForm<Auth.SignIn.Fields>({
    mode: 'onChange',
    resolver: yupResolver(signInValidation),
    defaultValues: {
      [SIGNIN_FILEDS.EMAIL]: '',
      [SIGNIN_FILEDS.PASSWORD]: '',
    }
  });

  const submit = async (data: Auth.SignIn.Fields) => {
    const result = await auth.signIn(data);
    if (result.isFail()) {
      alert.error({ message: result.message || '' });
      return;
    }
    alert.log({ message: result.message || '', onOk: () => navigate('/') });
  }

  const { errorField, hasErrors } = useMemo(() => {
    const { errors } = formState;
    const errorFields = Object.keys(errors);
    return {
      errorField: errorFields.length === 0 ? '': errorFields[0],
      hasErrors: errorFields.length > 0
    }
  }, [formState]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller name={SIGNIN_FILEDS.EMAIL} control={control} render={({ field }) => 
        <div>
          <label htmlFor={SIGNIN_FILEDS.EMAIL}>이메일</label>
          <input id={SIGNIN_FILEDS.EMAIL} type={SIGNIN_FILEDS.EMAIL} {...field} />
        </div>
      }/>
      <Controller name={SIGNIN_FILEDS.PASSWORD} control={control} render={({ field }) => 
        <div>
          <label htmlFor={SIGNIN_FILEDS.PASSWORD}>비밀번호</label>
          <input id={SIGNIN_FILEDS.PASSWORD} type={SIGNIN_FILEDS.PASSWORD} {...field} />
        </div>
      }/>
      <ErrorMessage name={errorField} errors={formState.errors} />
      <button type="submit" disabled={hasErrors}>로그인</button>
      <button onClick={goToSignUp}>아직 등록된 계정이 없으신가요? 새로운 계정을 만들어 보세요.</button>
    </form>
  )
}

export default SignIn;