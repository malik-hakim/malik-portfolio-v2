import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllProjects, deleteProject, type ApiProject } from '@/api/projects';
import { fetchCategories } from '@/api/projects';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/api/client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Search,
  FolderKanban, Cpu, Brain, Globe, ExternalLink, Github, Play,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const categoryIcons: Record<string, React.ReactNode> = {
  iot: <Cpu className="w-4 h-4" />,
  'machine-learning': <Brain className="w-4 h-4" />,
  website: <Globe className="w-4 h-4" />,
};

const DashboardProjects = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: fetchAllProjects,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const filteredProjects = projects.filter((p: ApiProject) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category_slug === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground font-body">
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <motion.button
          onClick={() => navigate('/dashboard/projects/new')}
          className="cyber-button flex items-center gap-2 w-fit"
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 transition-all"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-xl text-sm font-body transition-all ${
              filterCategory === 'all'
                ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilterCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-sm font-body transition-all flex items-center gap-2 ${
                filterCategory === cat.slug
                  ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border'
              }`}
            >
              {categoryIcons[cat.slug]}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-6 h-28 animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <FolderKanban className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground font-body text-sm">
            {searchQuery || filterCategory !== 'all'
              ? 'Try adjusting your search or filter'
              : 'Get started by creating your first project'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project: ApiProject, index: number) => (
            <motion.div
              key={project.id}
              className="glass-card p-5 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {project.image ? (
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderKanban className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {project.is_active ? (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-cyber-emerald/10 text-cyber-emerald text-xs font-body">
                        <Eye className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-body">
                        <EyeOff className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {project.category_name && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-xs font-body text-primary">
                      {categoryIcons[project.category_slug || ''] || <FolderKanban className="w-3 h-3" />}
                      {project.category_name}
                    </span>
                  )}
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-cyber-cyan/10 text-cyber-cyan text-xs font-body">
                      {tag}
                    </span>
                  ))}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyber-cyan">
                      <Play className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => navigate(`/dashboard/projects/${project.id}/edit`)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-all"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-heading">Delete Project?</AlertDialogTitle>
                      <AlertDialogDescription className="font-body">
                        Are you sure you want to delete "{project.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-body">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(project.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-body"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardProjects;
