
import { useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { modules } from "./config/modules";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";
import DepartmentDetail from "./pages/DepartmentDetail";
import { ArrowLeft, GraduationCap } from "lucide-react";

function Shell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const resource = location.pathname.startsWith("/module/")
    ? location.pathname.split("/")[2]
    : "";

  const title =
    resource && modules[resource]
      ? modules[resource].label
      : "Dashboard";

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-shell">
        <Topbar
          title={title}
          onMenu={() => setSidebarOpen((v) => !v)}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/departments/:id"
              element={<DepartmentDetail />}
            />

            <Route
              path="/module/:resource"
              element={<ModuleRoute />}
            />

            <Route
              path="*"
              element={
                <div className="not-found">
                  <div className="not-found-icon">
                    <GraduationCap size={34} />
                  </div>
                  <h1>Page not found</h1>
                  <p>
                    The page you're looking for doesn't exist.
                  </p>
                  <Link to="/" className="button button-primary">
                    <ArrowLeft size={16} /> Back to dashboard
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function ModuleRoute() {
  const location = useLocation();
  const resource = location.pathname.split("/")[2];

  return modules[resource] ? (
    <ModulePage resource={resource} />
  ) : (
    <div className="alert alert-error">
      Unknown module. Select a module from the sidebar.
    </div>
  );
}

export default function App() {
  return <Shell />;
}
