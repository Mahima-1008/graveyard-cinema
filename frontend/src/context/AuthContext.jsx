import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = { id: 'u1', email, name: email.split('@')[0] };
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('gc_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const mockUser = { id: 'u1', email, name };
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('gc_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gc_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
