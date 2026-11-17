import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("gestor@rota.app");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
  const appName = import.meta.env.VITE_APP_NAME || "Rota";

  if (user) {
    return <Navigate to={user.role === "gestor" ? "/dashboard" : "/tecnico"} replace />;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(login(email, password));
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden bg-ink-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-route-400">
          {appName}
        </p>
        <div>
          <h1 className="max-w-md text-4xl font-semibold leading-tight">
            A operação do dia, visível numa tela só.
          </h1>
          <p className="mt-4 max-w-md text-slate-300">
            Veja onde cada técnico está, distribua os serviços e avise o cliente
            no WhatsApp — sem planilha e sem grupo infinito.
          </p>
        </div>
        <p className="text-sm text-slate-500">MVP para empresas de serviços de campo.</p>
      </section>

      <section className="flex items-center justify-center bg-sand p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card"
        >
          <h2 className="text-2xl font-semibold text-ink-900">Entrar</h2>
          <p className="mt-1 text-sm text-slate-500">
            Use uma das contas de demonstração abaixo.
          </p>

          <label className="mt-6 block text-sm font-medium text-ink-800">
            E-mail
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-route-500 focus:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink-800">
            Senha
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-route-500 focus:ring-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-ink-900 py-2.5 font-medium text-white hover:bg-ink-800"
          >
            Acessar painel
          </button>

          <div className="mt-6 space-y-2 rounded-2xl bg-sand p-4 text-sm text-slate-700">
            <p className="font-semibold text-ink-900">Contas demo</p>
            <p>
              Gestor: <code>gestor@rota.app</code> / <code>123456</code>
            </p>
            <p>
              Técnico: <code>tecnico@rota.app</code> / <code>123456</code>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
