import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const appName = import.meta.env.VITE_APP_NAME || "Rota";

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 text-sm font-bold text-route-400">
              R
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">{appName}</p>
              <p className="text-xs text-slate-500">Operação de campo</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 text-sm">
            {user?.role === "gestor" && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 ${isActive ? "bg-sand font-semibold" : "text-slate-600"}`
                }
              >
                Gestor
              </NavLink>
            )}
            {user?.role === "tecnico" && (
              <NavLink
                to="/tecnico"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 ${isActive ? "bg-sand font-semibold" : "text-slate-600"}`
                }
              >
                Meu dia
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-ink-900">{user?.name}</p>
              <p className="text-xs capitalize text-slate-500">{user?.role}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-sand"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
