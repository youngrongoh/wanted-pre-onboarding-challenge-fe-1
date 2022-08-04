declare namespace Auth {
  type Steps = import('./meta').AUTH_STEPS; 
  type Step = Steps[keyof Steps];
}
