import type React from "react";
import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getCurrentUser, loginUser, logoutUser, signupUser } from "../api/apiAuth";
import { AuthContext } from "./AuthContext";
import type { UserRegistration } from "../types/UserRegistration";

type Props = {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // check if the user is authorized
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        // if authorized get the user 
        const currentUser = await getCurrentUser(accessToken);
        setUser(currentUser);
      } catch { // if not authorized we need to clean localStorage 
        // there might be another unvalid token 
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    // the way to call an asynchronous function inside useEffect
    void checkAuth();
  }, [])

  const login = async (data: Pick<UserRegistration, "email" | "password">) => {
    const tokens = await loginUser(data);
    // when the user was logined we save tokens in localStorage 
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);

    const currentUser = await getCurrentUser(tokens.access);
    setUser(currentUser);
  };

  const logout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      await logoutUser(accessToken, refreshToken)
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setUser(null);
  };

  const signup = async (data: UserRegistration) => {
    await signupUser(data);
    const dataForLogin = {
      email: data.email,
      password: data.password,
    }

    await login(dataForLogin)
  };

  const value = {
    user,
    isAuthenticated: Boolean(user), // check if user true or false 
    isLoading,  
    login,
    logout,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

