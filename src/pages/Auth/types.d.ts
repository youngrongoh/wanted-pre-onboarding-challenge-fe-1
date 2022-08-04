declare namespace Auth {
  type Steps = import('./meta').AUTH_STEPS; 
  type Step = Steps[keyof Steps];

  namespace SignIn {
    type Fields = import('./meta').SIGNIN_FILEDS;
  }

  namespace SignUp {
    type Fields = import('./meta').SIGNUP_FILEDS;
  }
}
