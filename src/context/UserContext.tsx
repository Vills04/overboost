"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  user: { nombre: string; rol: string } | null; // Agregamos el rol
  setUser: (user: { nombre: string; rol: string } | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ nombre: string; rol: string } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
