import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './tanstack/queryClient.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics.tsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <GoogleAnalytics />
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
  // </StrictMode>,
);
