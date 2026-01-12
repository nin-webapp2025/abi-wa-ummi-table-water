import React, { createContext, useEffect, useState } from 'react';
import { mockAuthService as authService } from '../services/mockAuthService';
import type { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    authService.getSession().then((session) => {
      if (session?.user) {
        authService.getUserProfile(session.user.id).then((profile) => {
          setUser(profile);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Subscribe to auth changes
    const { data: authListener } = authService.onAuthStateChange((profile) => {
      setUser(profile);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user: authUser } = await authService.signIn(email, password);
    if (authUser) {
      const profile = await authService.getUserProfile(authUser.id);
      setUser(profile);
    }
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const hasRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
