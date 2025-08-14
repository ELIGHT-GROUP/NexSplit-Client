// AuthMiddleware.tsx
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import SplashScreen from './SplashScreen';
import { useRouter } from 'expo-router';

export const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <SplashScreen />
    );
  }

  if (!token) {
    router.replace('/(auth)/sign-in');
  }

  return <>{children}</>;
};
