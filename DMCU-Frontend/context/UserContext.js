"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchJson, apiRequest } from "@/lib/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    const token = localStorage.getItem("dmcu_user_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetchJson("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.success) {
        setUser(response.data);
      } else {
        localStorage.removeItem("dmcu_user_token");
      }
    } catch (err) {
      console.error("Failed to load user profile", err);
      localStorage.removeItem("dmcu_user_token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const login = async (email, password, legalAccepted) => {
    const response = await apiRequest("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password, legalAccepted })
    });
    if (response.success) {
      localStorage.setItem("dmcu_user_token", response.token);
      setUser(response.user);
    }
    return response;
  };

  const register = async (name, email, password, legalAccepted) => {
    const response = await apiRequest("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, legalAccepted })
    });
    if (response.success) {
      localStorage.setItem("dmcu_user_token", response.token);
      setUser(response.user);
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem("dmcu_user_token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout, refreshProfile: loadProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
