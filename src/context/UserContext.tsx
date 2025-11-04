
'use client';

import React, { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  phone: string;
  address: string;
  access_token: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(null);
  useEffect(() => {

    if (session) {
      setUser({
        id: session?.user.id,
        name: session.user?.name,
        email: session.user.email,
        image: session.user?.image,
        role: session.user.role,
        phone: session.user.phone,
        address: session.user.address,
        access_token: session.access_token,
      });
    } else {
      setUser(null);
    }
  }, [session]);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}