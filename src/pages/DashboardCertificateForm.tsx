import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getImageUrl } from '@/api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllCertificates, createCertificate, updateCertificate } from '@/api/certificates';
import type { ApiCertificate } from '@/api/certificates';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const DashboardCertificateForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: certificates = [] } = useQuery({
    queryKey: ['admin-certificates'],
    queryFn: fetchAllCertificates,
    enabled: isEditing,
  });

  const existingCert = isEditing ? certificates.find((c: ApiCertificate) => c.id === Number(id)) : null;

  // Form state
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [description, setDescription] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (existingCert) {
      setTitle(existingCert.title);
      setIssuer(existingCert.issuer);
      setDescription(existingCert.description || '');
      setCredentialId(existingCert.credential_id || '');
      setCredentialUrl(existingCert.credential_url || '');
      setSortOrder(existingCert.sort_order);
      setIsActive(existingCert.is_active);
      setSkills(existingCert.skills);
      setImagePreview(getImageUrl(existingCert.image));
    }
  }, [existingCert]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const createMutation = useMutation({
    mutationFn: createCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Certificate created successfully!');
      navigate('/dashboard/certificates');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) => updateCertificate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Certificate updated successfully!');
      navigate('/dashboard/certificates');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !issuer) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('issuer', issuer);
    formData.append('description', description);
    formData.append('credential_id', credentialId);
    formData.append('credential_url', credentialUrl);
    formData.append('sort_order', sortOrder.toString());
    formData.append('is_active', isActive.toString());
    formData.append('skills', JSON.stringify(skills));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: Number(id), data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch {
      // handled by mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = "w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 focus:border-cyber-cyan/50 transition-all";
  const labelClassName = "text-sm font-body font-medium text-foreground";

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/certificates')}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            {isEditing ? 'Edit Certificate' : 'New Certificate'}
          </h1>
          <p className="text-muted-foreground font-body text-sm">
            {isEditing ? 'Update certificate details' : 'Add a new certification or credential'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Certificate Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClassName}>Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Certificate title"
                className={inputClassName}
                required
              />
            </div>
            <div className="space-y-2">
              <label className={labelClassName}>Issuer *</label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Dicoding, Google, AWS"
                className={inputClassName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the certificate"
              rows={3}
              className={inputClassName + " resize-none"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClassName}>Credential ID</label>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="Certificate ID"
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClassName}>Credential URL</label>
              <input
                type="url"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                placeholder="https://..."
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClassName}>Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className={inputClassName}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch id="cert-active" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="cert-active" className="font-body text-sm cursor-pointer">
                {isActive ? 'Published' : 'Draft'}
              </Label>
            </div>
          </div>
        </div>

        {/* Certificate Image */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Certificate Image</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {imagePreview && (
              <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-muted">
                <img src={imagePreview} alt="Certificate" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-background/80 text-foreground hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <label className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-cyber-cyan/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground font-body">Click to upload certificate image</span>
              <span className="text-xs text-muted-foreground/50 font-body mt-1">JPEG, PNG, WebP (max 5MB)</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Skills</h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); }}}
              placeholder="Add skill..."
              className={inputClassName + " flex-1"}
            />
            <button
              type="button"
              onClick={addSkill}
              className="p-3 rounded-xl bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyber-cyan/10 text-cyber-cyan text-xs font-body">
                {skill}
                <button type="button" onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/certificates')}
            className="px-6 py-3 rounded-xl border border-border text-foreground font-body font-medium hover:bg-muted/50 transition-all"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="cyber-button flex items-center gap-2 disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEditing ? 'Update Certificate' : 'Create Certificate'}</span>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default DashboardCertificateForm;
