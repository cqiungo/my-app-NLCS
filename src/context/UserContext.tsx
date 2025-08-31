
'use client';

import React, { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

type User = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
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
        _id: session?.user._id,
        name: session.user?.name,
        email: session.user.email,
        image: session.user?.image,
        role: session.user.role,
        access_token: session.user?.accessToken,
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