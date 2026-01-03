import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('globetrotter_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user exists in localStorage (from previous signup)
    const savedUsers = JSON.parse(localStorage.getItem('globetrotter_users') || '[]');
    const existingUser = savedUsers.find((u: any) => u.email === email);
    
    if (existingUser && existingUser.password === password) {
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      localStorage.setItem('globetrotter_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    // Demo login
    if (email === 'demo@globetrotter.com' && password === 'demo123') {
      const demoUser: User = {
        id: 'user-1',
        name: 'Alex Traveler',
        email: 'demo@globetrotter.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        createdAt: new Date()
      };
      setUser(demoUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(demoUser));
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const savedUsers = JSON.parse(localStorage.getItem('globetrotter_users') || '[]');
    
    if (savedUsers.some((u: any) => u.email === email)) {
      return false; // User already exists
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      createdAt: new Date()
    };
    
    // Save user with password
    savedUsers.push({ ...newUser, password });
    localStorage.setItem('globetrotter_users', JSON.stringify(savedUsers));
    
    // Login the user
    setUser(newUser);
    localStorage.setItem('globetrotter_user', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('globetrotter_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
