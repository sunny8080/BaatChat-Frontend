import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import FullPageLoader from '../FullPageLoader/FullPageLoader';

/**
 * Guards protected routes by rendering children only after authentication is
 * loaded and a signed-in user with an access token is available.
 *
 * Redirects unauthenticated users to the auth page.
 */
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken, isAuthLoading, user } = useAuth();

  // TODO - replace FullPageLoader with CHat UI skeleton
  if (isAuthLoading) {
    return <FullPageLoader />;
  }

  if (accessToken && user && user.id) {
    return children;
  }

  return <Navigate to={'/auth'} replace />;
};

export default PrivateRoute;
