import * as yup from 'yup';
import { SIGNUP_ERROR } from '../const/error';
import { SIGNUP_FILEDS } from '../pages/Auth/meta';

const signUpValidation = yup.object().shape({
  [SIGNUP_FILEDS.EMAIL]: yup.string()
    .required(SIGNUP_ERROR.EMAIL_REQUIRED_ERROR)
    .email(SIGNUP_ERROR.EMAIL_FORMAT_ERROR),
  [SIGNUP_FILEDS.PASSWORD]: yup.string()
    .required(SIGNUP_ERROR.PASSWORD_REQUIRED_ERROR)
    .test('Password format check', SIGNUP_ERROR.PASSWORD_FORMAT_ERROR, (value) => { 
      if (typeof value !== 'string') return false;
      const match = value.match(/[^0-9a-zA-Z~`!@#$%^&*()_+{}|<>?/]+/);
      const hasOnlyValidChar = match == null;
      return hasOnlyValidChar;
    })
    .min(8, SIGNUP_ERROR.PASSWORD_LENGTH_ERROR),
})

export default signUpValidation;