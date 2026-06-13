import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

const sidebarLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderKanban, end: false },
  { to: '/dashboard/certificates', label: 'Certificates', icon: Award, end: false },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings, end: false },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(180 10% 6%) 100%)',
          borderRight: '1px solid hsl(180 15% 15%)',
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-heading font-bold"
                style={{
                  background: 'linear-gradient(135deg, hsl(189 94% 43%) 0%, hsl(160 84% 39%) 100%)',
                  color: 'hsl(0 0% 2%)',
                }}
              >
                MH
              </div>
              <div>
                <h2 className="font-heading font-bold text-foreground text-sm">Admin Panel</h2>
                <p className="text-xs text-muted-foreground font-body">Portfolio Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all duration-200 group ${
                  isActive
                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon className={`w-5 h-5 ${isActive ? 'text-cyber-cyan' : ''}`} />
                  <span className="flex-1">{link.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 text-cyber-cyan" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border/50 space-y-3">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-xs font-heading font-bold text-foreground">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground truncate">{user?.username}</p>
              <p className="text-xs text-muted-foreground font-body">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 flex items-center px-6 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors mr-4"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-cyber-cyan font-body transition-colors"
          >
            View Portfolio →
          </a>
        </header>

        {/* Page content */}
        <motion.div
          className="p-6 lg:p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
