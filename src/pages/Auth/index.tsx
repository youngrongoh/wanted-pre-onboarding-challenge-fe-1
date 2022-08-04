import React, { useState } from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AUTH_STEPS } from './meta';

const Auth = () => {
  const [step, setStep] = useState<Auth.Step>(AUTH_STEPS.SIGNIN);

  return (
    <div>
      {step === AUTH_STEPS.SIGNIN && <SignIn goToSignUp={() => setStep(AUTH_STEPS.SIGNUP)} />}
      {step === AUTH_STEPS.SIGNUP && <SignUp goToSignIn={() => setStep(AUTH_STEPS.SIGNIN)} />}
    </div>
  )
}

export default Auth;