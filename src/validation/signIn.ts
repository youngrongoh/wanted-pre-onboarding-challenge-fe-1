import * as yup from 'yup';
import { SIGNIN_ERROR } from '../const/error';
import { SIGNIN_FILEDS } from '../pages/Auth/meta';

const signInValidation = yup.object().shape({
  [SIGNIN_FILEDS.EMAIL]: yup.string()
    .required(SIGNIN_ERROR.EMAIL_REQUIRED_ERROR)
    .email(SIGNIN_ERROR.INVALID_INPUT_ERROR),
  [SIGNIN_FILEDS.PASSWORD]: yup.string()
    .required(SIGNIN_ERROR.PASSWORD_REQUIRED_ERROR)
    .test('Password format check', SIGNIN_ERROR.INVALID_INPUT_ERROR, (value) => { 
      if (typeof value !== 'string') return false;
      const match = value.match(/[^0-9a-zA-Z~`!@#$%^&*()_+{}|<>?/]+/);
      const hasOnlyValidChar = match == null;
      return hasOnlyValidChar;
    })
    .min(8, SIGNIN_ERROR.INVALID_INPUT_ERROR),
})

export default signInValidation;