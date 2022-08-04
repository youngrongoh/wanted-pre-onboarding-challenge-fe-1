import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import signUpValidation from '../../validation/signup';
import { SIGNUP_FILEDS } from './meta';

interface ISignUp {
  goToSignIn: () => void;
}

const SignUp = ({ goToSignIn }: ISignUp) => {

  const { control, handleSubmit, formState } = useForm<Auth.SignUp.Fields>({
    mode: 'onChange',
    resolver: yupResolver(signUpValidation),
    defaultValues: {
      [SIGNUP_FILEDS.EMAIL]: '',
      [SIGNUP_FILEDS.PASSWORD]: '',
    }
  });

  const submit = (data: Auth.SignUp.Fields) => {
    // console.log(data);
    goToSignIn();
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller name={SIGNUP_FILEDS.EMAIL} control={control} render={({ field }) => 
        <div>
          <label>이메일</label>
          <input id={SIGNUP_FILEDS.EMAIL} type={SIGNUP_FILEDS.EMAIL} {...field} />
          <ErrorMessage name={SIGNUP_FILEDS.EMAIL} errors={formState.errors} />
        </div>
      }/>
      <Controller name={SIGNUP_FILEDS.PASSWORD} control={control} render={({ field }) => 
        <div>
          <label>비밀번호</label>
          <input id={SIGNUP_FILEDS.PASSWORD} type={SIGNUP_FILEDS.PASSWORD} {...field} />
          <ErrorMessage name={SIGNUP_FILEDS.PASSWORD} errors={formState.errors} />
        </div>
      }/>
      <button type="submit">회원가입</button>
    </form>
  )
}

export default SignUp;