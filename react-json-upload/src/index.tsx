import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';


const root = createRoot(document.getElementById('root')!);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </QueryClientProvider>
);
