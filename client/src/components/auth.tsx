"use client";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: (username: string, password: string) => {},
  logout: () => {},
  user: {
    id: "",
    name: "",
    email: "",
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",

  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/profile", {
          credentials: "include",
        });

        setIsLoggedIn(response.ok);
        const res = await response.json();
        setUser({
          name: res.name,
          email: res.email,
          id: res.id,
        });
      } catch (error) {
        setIsLoggedIn(false);
        console.log("Check auth failed", error);
        throw new Error("Check auth failed");
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        const res = await response.json();
        console.log(res);
        setUser({
          ...user,
          email: res.username,
          id: res.id,
        });
      } else {
        setIsLoggedIn(false);
        console.log("Login failed", response);
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setUser({ email: "", name: "", id: ""});
      } else {
        console.log("Logout failed", response);
      }
    } catch (error) {
      throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children || null}
    </AuthContext.Provider>
  );
};
