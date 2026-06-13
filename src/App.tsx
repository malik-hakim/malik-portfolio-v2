import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import DashboardLogin from "./pages/DashboardLogin";
import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardProjects from "./pages/DashboardProjects";
import DashboardProjectForm from "./pages/DashboardProjectForm";
import DashboardCertificates from "./pages/DashboardCertificates";
import DashboardCertificateForm from "./pages/DashboardCertificateForm";
import DashboardSettings from "./pages/DashboardSettings";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyber-cyan border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return <>{children}</>;
};

// Redirect authenticated users away from login
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyber-cyan border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Public portfolio routes */}
    <Route path="/" element={<Index />} />
    <Route path="/project/:id" element={<ProjectDetail />} />

    {/* Dashboard routes */}
    <Route
      path="/dashboard/login"
      element={
        <PublicOnlyRoute>
          <DashboardLogin />
        </PublicOnlyRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardOverview />} />
      <Route path="projects" element={<DashboardProjects />} />
      <Route path="projects/new" element={<DashboardProjectForm />} />
      <Route path="projects/:id/edit" element={<DashboardProjectForm />} />
      <Route path="certificates" element={<DashboardCertificates />} />
      <Route path="certificates/new" element={<DashboardCertificateForm />} />
      <Route path="certificates/:id/edit" element={<DashboardCertificateForm />} />
      <Route path="settings" element={<DashboardSettings />} />
    </Route>

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
