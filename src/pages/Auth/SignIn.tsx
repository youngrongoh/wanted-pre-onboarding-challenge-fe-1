import React, { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import signInValidation from '../../validation/signIn';
import { SIGNIN_FILEDS } from './meta';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';

interface ISignIn {
  goToSignUp: () => void;
}

const SignIn = ({ goToSignUp }: ISignIn) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState, trigger } = useForm<Auth.SignIn.Fields>({
    mode: 'onChange',
    resolver: yupResolver(signInValidation),
    defaultValues: {
      [SIGNIN_FILEDS.EMAIL]: '',
      [SIGNIN_FILEDS.PASSWORD]: '',
    }
  });

  const submit = (data: Auth.SignIn.Fields) => {
    navigate('/');
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