import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getImageUrl } from '@/api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllProjects, createProject, updateProject, fetchCategories, uploadGalleryImages, deleteGalleryImage } from '@/api/projects';
import type { ApiProject } from '@/api/projects';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Plus, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const DashboardProjectForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: fetchAllProjects,
    enabled: isEditing,
  });

  const existingProject = isEditing ? projects.find((p: ApiProject) => p.id === Number(id)) : null;

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<{ id: number; image_path: string }[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get selected category slug to check if IoT
  const selectedCategory = categories.find(c => c.id === Number(categoryId));
  const isIoT = selectedCategory?.slug === 'iot';

  // Populate form when editing
  useEffect(() => {
    if (existingProject) {
      setTitle(existingProject.title);
      setSlug(existingProject.slug);
      setDescription(existingProject.description);
      setFullDescription(existingProject.full_description || '');
      setGithubUrl(existingProject.github_url || '');
      setLiveUrl(existingProject.live_url || '');
      setDemoUrl(existingProject.demo_url || '');
      setCategoryId(existingProject.category_id?.toString() || '');
      setSortOrder(existingProject.sort_order);
      setIsActive(existingProject.is_active);
      setTags(existingProject.tags);
      setTechStack(existingProject.techStack);
      setFeatures(existingProject.features);
      setImagePreview(getImageUrl(existingProject.image));
      setExistingGallery(existingProject.gallery);
    }
  }, [existingProject]);

  // Auto-generate slug from title
  const generateSlug = (value: string) => {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addItem = (list: string[], setList: (v: string[]) => void, input: string, setInput: (v: string) => void) => {
    const trimmed = input.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
      setInput('');
    }
  };

  const removeItem = (list: string[], setList: (v: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Project created successfully!');
      navigate('/dashboard/projects');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Project updated successfully!');
      navigate('/dashboard/projects');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const galleryUploadMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) => uploadGalleryImages(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
    },
  });

  const galleryDeleteMutation = useMutation({
    mutationFn: deleteGalleryImage,
    onSuccess: (_, galleryId) => {
      setExistingGallery(prev => prev.filter(g => g.id !== galleryId));
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Gallery image deleted');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('full_description', fullDescription);
    formData.append('github_url', githubUrl);
    formData.append('live_url', liveUrl);
    formData.append('demo_url', demoUrl);
    formData.append('category_id', categoryId);
    formData.append('sort_order', sortOrder.toString());
    formData.append('is_active', isActive.toString());
    formData.append('tags', JSON.stringify(tags));
    formData.append('tech_stack', JSON.stringify(techStack));
    formData.append('features', JSON.stringify(features));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        const result = await updateMutation.mutateAsync({ id: Number(id), data: formData });

        // Upload new gallery images if any
        if (galleryFiles.length > 0) {
          const galleryFormData = new FormData();
          galleryFiles.forEach(file => galleryFormData.append('images', file));
          await galleryUploadMutation.mutateAsync({ id: result.id, data: galleryFormData });
        }
      } else {
        const result = await createMutation.mutateAsync(formData);

        // Upload gallery images if any
        if (galleryFiles.length > 0) {
          const galleryFormData = new FormData();
          galleryFiles.forEach(file => galleryFormData.append('images', file));
          await galleryUploadMutation.mutateAsync({ id: result.id, data: galleryFormData });
        }
      }
    } catch {
      // Error handled by mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = "w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 focus:border-cyber-cyan/50 transition-all";
  const labelClassName = "text-sm font-body font-medium text-foreground";

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/projects')}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            {isEditing ? 'Edit Project' : 'New Project'}
          </h1>
          <p className="text-muted-foreground font-body text-sm">
            {isEditing ? 'Update project details' : 'Create a new portfolio project'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClassName}>Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Project title"
                className={inputClassName}
                required
              />
            </div>
            <div className="space-y-2">
              <label className={labelClassName}>Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="project-slug"
                className={inputClassName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>Short Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the project"
              rows={2}
              className={inputClassName + " resize-none"}
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>Full Description</label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Detailed project description"
              rows={5}
              className={inputClassName + " resize-none"}
            />
          </div>
        </div>

        {/* Category & Links */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Category & Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClassName}>Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={inputClassName}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className={labelClassName}>Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClassName}>GitHub URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClassName}>Live URL</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className={inputClassName}
              />
            </div>
          </div>

          {/* Demo URL - shown for IoT or always available */}
          <div className="space-y-2">
            <label className={labelClassName}>
              Demo / Demonstration URL
              {isIoT && <span className="ml-2 text-xs text-cyber-cyan">(IoT Project)</span>}
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://youtube.com/... or demo link"
              className={inputClassName}
            />
            <p className="text-xs text-muted-foreground font-body">
              Link to video demonstration or live demo of the project
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="is-active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="is-active" className="font-body text-sm cursor-pointer">
              {isActive ? 'Published (visible on portfolio)' : 'Draft (hidden from portfolio)'}
            </Label>
          </div>
        </div>

        {/* Cover Image */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Cover Image</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {imagePreview && (
              <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-muted">
                <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
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
              <span className="text-sm text-muted-foreground font-body">
                Click to upload cover image
              </span>
              <span className="text-xs text-muted-foreground/50 font-body mt-1">
                JPEG, PNG, WebP (max 5MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Gallery */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Project Gallery</h2>

          {/* Existing gallery */}
          {existingGallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {existingGallery.map(img => (
                <div key={img.id} className="relative rounded-lg overflow-hidden bg-muted group">
                  <img src={getImageUrl(img.image_path)} alt="" className="w-full h-24 object-cover" />
                  <button
                    type="button"
                    onClick={() => galleryDeleteMutation.mutate(img.id)}
                    className="absolute top-1 right-1 p-1 rounded bg-background/80 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New gallery uploads */}
          {galleryFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {galleryFiles.map((file, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden bg-muted group">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-24 object-cover" />
                  <button
                    type="button"
                    onClick={() => setGalleryFiles(prev => prev.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 p-1 rounded bg-background/80 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-cyber-cyan/50 transition-colors">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-body">Add gallery images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setGalleryFiles(prev => [...prev, ...files]);
                e.target.value = '';
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Tags, Tech Stack, Features */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-heading font-semibold text-foreground">Tags & Details</h2>

          {/* Tags */}
          <div className="space-y-2">
            <label className={labelClassName}>Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(tags, setTags, tagInput, setTagInput); }}}
                placeholder="Add tag..."
                className={inputClassName + " flex-1"}
              />
              <button
                type="button"
                onClick={() => addItem(tags, setTags, tagInput, setTagInput)}
                className="p-3 rounded-xl bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyber-cyan/10 text-cyber-cyan text-xs font-body">
                  {tag}
                  <button type="button" onClick={() => removeItem(tags, setTags, i)} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <label className={labelClassName}>Tech Stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(techStack, setTechStack, techInput, setTechInput); }}}
                placeholder="Add technology..."
                className={inputClassName + " flex-1"}
              />
              <button
                type="button"
                onClick={() => addItem(techStack, setTechStack, techInput, setTechInput)}
                className="p-3 rounded-xl bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-body">
                  {tech}
                  <button type="button" onClick={() => removeItem(techStack, setTechStack, i)} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <label className={labelClassName}>Key Features</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(features, setFeatures, featureInput, setFeatureInput); }}}
                placeholder="Add feature..."
                className={inputClassName + " flex-1"}
              />
              <button
                type="button"
                onClick={() => addItem(features, setFeatures, featureInput, setFeatureInput)}
                className="p-3 rounded-xl bg-cyber-emerald/10 text-cyber-emerald hover:bg-cyber-emerald/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyber-emerald/10 text-cyber-emerald text-xs font-body">
                  {feature}
                  <button type="button" onClick={() => removeItem(features, setFeatures, i)} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/projects')}
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
              <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default DashboardProjectForm;
