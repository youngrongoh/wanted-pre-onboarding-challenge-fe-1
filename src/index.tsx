import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import { AuthContextProvider } from './context/auth';
import { AlertContextProvider } from './context/alert';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AlertContextProvider>
          <Router />
        </AlertContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

