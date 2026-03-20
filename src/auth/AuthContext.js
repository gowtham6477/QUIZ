import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch, setToken as storeToken } from "../api/client";

const AuthContext = createContext();

const loadUser = () => {
  const raw = localStorage.getItem("quiz_user");
  return raw ? JSON.parse(raw) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser());

  const saveUser = (payload) => {
    if (payload) {
      localStorage.setItem("quiz_user", JSON.stringify(payload));
    } else {
      localStorage.removeItem("quiz_user");
    }
    setUser(payload);
  };

  const login = async (email, password) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    storeToken(data.token);
    saveUser({
      id: data.userId,
      email: data.email,
      username: data.username,
      role: data.role
    });
    return data;
  };

  const register = async (username, email, password, college) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password, college })
    });
    storeToken(data.token);
    saveUser({
      id: data.userId,
      email: data.email,
      username: data.username,
      role: data.role,
      college
    });
    return data;
  };

  const logout = useCallback(() => {
    storeToken(null);
    saveUser(null);
  }, []);

  const value = { user, login, register, logout };

  useEffect(() => {
    const token = localStorage.getItem("quiz_token");
    if (!token) {
      return;
    }
    apiFetch("/auth/me")
      .then((profile) => {
        saveUser({
          id: profile.userId,
          email: profile.email,
          username: profile.username,
          role: profile.role,
          college: profile.college
        });
      })
      .catch(() => {
        logout();
      });
  }, [logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
