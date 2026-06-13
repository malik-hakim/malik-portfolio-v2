import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/api/auth';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, KeyRound, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

const DashboardSettings = () => {
  const { user, checkAuth } = useAuth();

  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }

    if (newPassword || oldPassword || confirmPassword) {
      if (!oldPassword) {
        toast.error('Current password is required to change password');
        return;
      }
      if (!newPassword) {
        toast.error('New password cannot be empty');
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }
      if (newPassword.length < 6) {
        toast.error('New password must be at least 6 characters long');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      await updateProfile({
        username: username.trim(),
        oldPassword: oldPassword || undefined,
        newPassword: newPassword || undefined,
      });

      toast.success('Profile credentials updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      await checkAuth(); // Refresh username in context/sidebar
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = "w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 focus:border-cyber-cyan/50 transition-all";
  const labelClassName = "text-sm font-body font-medium text-foreground flex items-center gap-2";

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Dashboard Settings
        </h1>
        <p className="text-muted-foreground font-body text-sm">
          Manage your administrator account credentials (username and password)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account Username */}
        <div className="glass-card p-6 space-y-5">
          <div className="flex items-center gap-3 border-b border-border/50 pb-3">
            <UserIcon className="w-5 h-5 text-cyber-cyan" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Username Settings</h2>
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>Administrator Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={inputClassName}
              required
            />
            <p className="text-xs text-muted-foreground font-body">
              This is the username used to sign in to the admin panel.
            </p>
          </div>
        </div>

        {/* Change Password */}
        <div className="glass-card p-6 space-y-5">
          <div className="flex items-center gap-3 border-b border-border/50 pb-3">
            <KeyRound className="w-5 h-5 text-cyber-emerald" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Security Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className={labelClassName}>Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClassName}
              />
              <p className="text-xs text-muted-foreground font-body">
                Required only if you want to change your password.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelClassName}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClassName}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClassName}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="cyber-button flex items-center gap-2 disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Save Settings</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default DashboardSettings;
