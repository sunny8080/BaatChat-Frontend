import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Guards protected routes by rendering children only after authentication is
 * loaded and a signed-in user with an access token is available.
 *
 * Redirects unauthenticated users to the auth page.
 */
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken, isAuthLoading, user } = useAuth();

  if (isAuthLoading) {
    return <div>Loading</div>;
  }

  if (accessToken && user && user.id) {
    return children;
  }

  return <Navigate to={'/auth'} replace />;
};

export default PrivateRoute;
