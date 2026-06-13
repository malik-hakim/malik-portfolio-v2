import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Github, ExternalLink, Play, Cpu, Brain, Globe } from "lucide-react";
import { fetchProjects, fetchCategories, type ApiProject, type ApiCategory } from "@/api/projects";
import { getImageUrl } from "@/api/client";

// Keep the interface export for backward compatibility
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  demo?: string;
  fullDescription: string;
  gallery: string[];
  techStack: string[];
  features: string[];
  category?: string;
  categorySlug?: string;
}

// Transform API data to the existing interface shape
function toProject(p: ApiProject): Project {
  return {
    id: p.slug,
    title: p.title,
    description: p.description,
    image: p.image || "",
    tags: p.tags,
    github: p.github_url || undefined,
    live: p.live_url || undefined,
    demo: p.demo_url || undefined,
    fullDescription: p.full_description || "",
    gallery: p.gallery.map(g => g.image_path),
    techStack: p.techStack,
    features: p.features,
    category: p.category_name || undefined,
    categorySlug: p.category_slug || undefined,
  };
}

const isValidLink = (url?: string | null) => {
  return url && url.trim() !== "" && url !== "null" && url !== "undefined";
};

const categoryIcons: Record<string, React.ReactNode> = {
  iot: <Cpu className="w-4 h-4" />,
  "machine-learning": <Brain className="w-4 h-4" />,
  website: <Globe className="w-4 h-4" />,
};

// Fallback hardcoded data in case API is not available
export const projectsData: Project[] = [];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: apiProjects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const projects = apiProjects.map(toProject);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.categorySlug === activeCategory);

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-dots opacity-20" />

      <div className="container relative z-10 px-6">
        {/* Section header */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
            <span className="text-sm text-muted-foreground font-body uppercase tracking-widest">
              Featured Work
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            A selection of my best work showcasing expertise across different technologies and domains
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="flex justify-center gap-3 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-xl text-sm font-body transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 glow-cyan"
                : "text-muted-foreground hover:text-foreground glass-card hover:border-border/80"
            }`}
          >
            All Projects
          </button>
          {categories.map((cat: ApiCategory) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body transition-all duration-300 ${
                activeCategory === cat.slug
                  ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 glow-cyan"
                  : "text-muted-foreground hover:text-foreground glass-card hover:border-border/80"
              }`}
            >
              {categoryIcons[cat.slug]}
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Loading skeleton */}
        {projectsLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted/50 rounded w-full" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted/30 rounded-full w-20" />
                    <div className="h-6 bg-muted/30 rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects grid */}
        {!projectsLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                className="group glass-card-hover cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => navigate(`/project/${project.id}`)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-background/50">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-auto object-contain transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                  
                  {/* Category badge */}
                  {project.category && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-xs font-body text-cyber-cyan backdrop-blur-sm">
                      {categoryIcons[project.categorySlug || ""]}
                      {project.category}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="flex items-center gap-2 text-cyber-cyan font-heading font-semibold">
                      <span>View Details</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-cyber-cyan transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {isValidLink(project.github) && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg glass-card hover:bg-cyber-cyan/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {isValidLink(project.live) && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg glass-card hover:bg-cyber-cyan/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {isValidLink(project.demo) && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg glass-card hover:bg-cyber-emerald/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="Watch Demo"
                        >
                          <Play className="w-4 h-4 text-cyber-emerald" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground font-body text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-body bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!projectsLoading && filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground font-body">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;