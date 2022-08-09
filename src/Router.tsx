import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Auth from './pages/Auth';
import Main from './pages/Main';

const Router = () => {
  const { data: { isSignedIn } } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={(
            <ProtectedRoute when={!isSignedIn} to="auth">
              <Main />
            </ProtectedRoute>
          )} />
          <Route path="todo">
            <Route path=":todoId" element={<Main />} />
          </Route>
          <Route path="auth" element={
            <ProtectedRoute when={isSignedIn} to="/">
              <Auth />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

type IProtectedRoute = { 
  when: boolean; 
  children: React.ReactElement;
} & React.ComponentProps<typeof Navigate>

const ProtectedRoute = ({ when, children, ...props }: IProtectedRoute) => {
  return (when ? <Navigate {...props} /> : children);
}