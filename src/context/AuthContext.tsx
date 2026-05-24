import type UserInterface from '../interfaces/UserInterface.ts';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getCurrentUser } from '../services/authService';
import { socket } from '../socket/socket.ts';

/**
 * Authentication state exposed throughout the frontend.
 */
type AuthContextType = {
  /** Currently authenticated user, or null when no session is active. */
  user: UserInterface | null;
  /** Latest access token loaded from localStorage, or null when unavailable. */
  accessToken: string | null;
  /** Whether the initial authentication check is currently running. */
  isAuthLoading: boolean | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

/**
 * React context containing the current authentication session details.
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  isAuthLoading: null,
  setUser: () => {},
  setAccessToken: () => {},
});

/**
 * Returns the current authentication context value.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Loads the saved session on mount and provides authentication state to descendants.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken') ?? null);

  useEffect(() => {
    const loadUser = async () => {
      setIsAuthLoading(true);
      let accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      if (accessToken && userId) {
        try {
          // user is logged in, so get current user details
          const res = await getCurrentUser();

          if (res && res.success) {
            // may be during api call token is changed, so this token may be not always latest
            // so don't depend on this context accessToken and use localStorage if req
            // we are using cookies for all api calls so it's not a problem for this project

            accessToken = localStorage.getItem('accessToken');
            setUser(res.data.user);
            setAccessToken(accessToken);
            socket.connect();
          } else {
            setUser(null);
            setAccessToken(null);
            socket.disconnect();
          }
        } catch (error) {
          // setIsAuthLoading(false);
        } finally {
          setIsAuthLoading(false);
        }
      }
      setIsAuthLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        accessToken,
        setUser,
        setAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
