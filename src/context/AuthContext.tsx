import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEMO_PASSWORD, USERS } from "../data/mock";
import type { User } from "../types";

const STORAGE_KEY = "rota.user";

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email, password) => {
        const found = USERS.find(
          (item) => item.email.toLowerCase() === email.trim().toLowerCase()
        );
        if (!found || password !== DEMO_PASSWORD) {
          return "E-mail ou senha inválidos. Use as contas de demonstração.";
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        } catch {
          return "Não foi possível iniciar a sessão neste navegador. Verifique o armazenamento local e tente novamente.";
        }
        setUser(found);
        return null;
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
