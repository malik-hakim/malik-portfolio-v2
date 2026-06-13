import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DashboardLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />
      <motion.div
        className="fixed top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(189 94% 43% / 0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(160 84% 39% / 0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.div
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(189 94% 43%) 0%, hsl(160 84% 39%) 100%)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Lock className="w-8 h-8 text-background" />
            </motion.div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard Login</h1>
            <p className="text-sm text-muted-foreground font-body">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-body font-medium text-foreground">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-input border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 focus:border-cyber-cyan/50 transition-all"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-body font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-input border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 focus:border-cyber-cyan/50 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="cyber-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </motion.button>
          </form>

          {/* Back to portfolio link */}
          <div className="text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-cyber-cyan transition-colors font-body"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardLogin;
