import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { useAuth } from "./context/AuthContext";
import { DashboardPage } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";
import { TechnicianPage } from "./pages/Technician";
import type { Role } from "./types";

function Protected({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === "gestor" ? "/dashboard" : "/tecnico"} replace />;
  }
  return <AppShell>{children}</AppShell>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <Protected role="gestor">
            <DashboardPage />
          </Protected>
        }
      />
      <Route
        path="/tecnico"
        element={
          <Protected role="tecnico">
            <TechnicianPage />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
