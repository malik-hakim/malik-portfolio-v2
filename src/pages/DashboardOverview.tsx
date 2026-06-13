import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '@/api/auth';
import { motion } from 'framer-motion';
import { FolderKanban, Award, Cpu, Brain, Globe, TrendingUp } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  iot: <Cpu className="w-5 h-5" />,
  'machine-learning': <Brain className="w-5 h-5" />,
  website: <Globe className="w-5 h-5" />,
};

const DashboardOverview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchStats,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-muted/50 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card p-6 h-32 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground font-body">
          Manage your portfolio projects and certificates
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="glass-card p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20">
              <FolderKanban className="w-5 h-5 text-cyber-cyan" />
            </div>
            <TrendingUp className="w-4 h-4 text-cyber-emerald" />
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-foreground">
              {stats?.projects.total || 0}
            </p>
            <p className="text-sm text-muted-foreground font-body">Total Projects</p>
          </div>
          <div className="text-xs text-cyber-emerald font-body">
            {stats?.projects.active || 0} active
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-cyber-emerald/10 border border-cyber-emerald/20">
              <Award className="w-5 h-5 text-cyber-emerald" />
            </div>
            <TrendingUp className="w-4 h-4 text-cyber-emerald" />
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-foreground">
              {stats?.certificates.total || 0}
            </p>
            <p className="text-sm text-muted-foreground font-body">Total Certificates</p>
          </div>
          <div className="text-xs text-cyber-emerald font-body">
            {stats?.certificates.active || 0} active
          </div>
        </motion.div>

        {stats?.categories.map((cat, index) => (
          <motion.div
            key={cat.slug}
            className="glass-card p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                {iconMap[cat.slug] || <FolderKanban className="w-5 h-5 text-primary" />}
              </div>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-foreground">{cat.count}</p>
              <p className="text-sm text-muted-foreground font-body">{cat.name} Projects</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/dashboard/projects/new"
            className="glass-card-hover p-6 flex items-center gap-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20">
              <FolderKanban className="w-6 h-6 text-cyber-cyan" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Add New Project</h3>
              <p className="text-sm text-muted-foreground font-body">
                Create a new portfolio project
              </p>
            </div>
          </a>

          <a
            href="/dashboard/certificates/new"
            className="glass-card-hover p-6 flex items-center gap-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-cyber-emerald/10 border border-cyber-emerald/20">
              <Award className="w-6 h-6 text-cyber-emerald" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Add New Certificate</h3>
              <p className="text-sm text-muted-foreground font-body">
                Add a new certification or credential
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
