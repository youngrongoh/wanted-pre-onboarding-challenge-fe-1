import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import { AlertContextProvider } from './context/alert';
import './index.css';
import { StorageProvider } from './context/storage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StorageProvider>
        <AlertContextProvider>
          <Router />
        </AlertContextProvider>
      </StorageProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

