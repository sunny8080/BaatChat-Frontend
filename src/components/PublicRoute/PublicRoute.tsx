import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Renders public-only content and redirects authenticated users to the chat page.
 *
 * Shows a loading state while authentication is being resolved.
 */
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuth();

  // This component will handle only routing things
  // so if token is present then redirect it to chat page and wont't wait for token to validate
  // if (isAuthLoading) {
  //   return <div>Loading...</div>;
  // }

  if (accessToken) {
    return <Navigate to={'/chat'} replace />;
  }

  return children;
};

export default PublicRoute;
