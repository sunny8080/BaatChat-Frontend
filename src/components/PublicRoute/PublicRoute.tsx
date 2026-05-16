import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Renders public-only content and redirects authenticated users to the chat page.
 *
 * Shows a loading state while authentication is being resolved.
 */
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken, isAuthLoading, user } = useAuth();

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (accessToken && user && user.id) {
    return <Navigate to={'/chat'} replace />;
  }

  return children;
};

export default PublicRoute;
