import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllCertificates, deleteCertificate, type ApiCertificate } from '@/api/certificates';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/api/client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Award, Building2 } from 'lucide-react';
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

const DashboardCertificates = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ['admin-certificates'],
    queryFn: fetchAllCertificates,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Certificate deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const filteredCertificates = certificates.filter((c: ApiCertificate) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Certificates</h1>
          <p className="text-muted-foreground font-body">
            Manage your certifications & credentials ({certificates.length} total)
          </p>
        </div>
        <motion.button
          onClick={() => navigate('/dashboard/certificates/new')}
          className="cyber-button flex items-center gap-2 w-fit"
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          <span>New Certificate</span>
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search certificates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 transition-all"
        />
      </div>

      {/* Certificates List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card p-6 h-40 animate-pulse" />
          ))}
        </div>
      ) : filteredCertificates.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">No certificates found</h3>
          <p className="text-muted-foreground font-body text-sm">
            {searchQuery ? 'Try adjusting your search' : 'Get started by adding your first certificate'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCertificates.map((cert: ApiCertificate, index: number) => (
            <motion.div
              key={cert.id}
              className="glass-card p-5 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {cert.image ? (
                    <img src={getImageUrl(cert.image)} alt={cert.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold text-foreground text-sm truncate">
                      {cert.title}
                    </h3>
                    {cert.is_active ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyber-emerald/10 text-cyber-emerald text-xs font-body flex-shrink-0">
                        <Eye className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-body flex-shrink-0">
                        <EyeOff className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <Building2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-body">{cert.issuer}</span>
                  </div>

                  {cert.credential_id && (
                    <p className="text-xs text-muted-foreground font-body mt-1">
                      ID: <span className="font-mono text-foreground/70">{cert.credential_id}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-cyber-cyan/10 text-cyber-cyan text-xs font-body">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <button
                  onClick={() => navigate(`/dashboard/certificates/${cert.id}/edit`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body text-muted-foreground hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-card border-border">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-heading">Delete Certificate?</AlertDialogTitle>
                      <AlertDialogDescription className="font-body">
                        Are you sure you want to delete "{cert.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-body">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(cert.id)}
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

export default DashboardCertificates;
