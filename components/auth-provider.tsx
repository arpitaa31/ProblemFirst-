"use client";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";

type AuthState = { user: User | null; isAuthenticated: boolean; isReady: boolean; signOutUser: () => Promise<void> };
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!auth) { setIsReady(true); return; }
    return onAuthStateChanged(auth, (nextUser) => { setUser(nextUser); setIsReady(true); });
  }, []);

  const signOutUser = useCallback(async () => {
    setUser(null);
    if (auth) await signOut(auth);
  }, []);
  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), isReady, signOutUser }), [user, isReady, signOutUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
