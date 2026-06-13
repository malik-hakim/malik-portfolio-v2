import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Check, Play } from "lucide-react";
import { fetchProjectBySlug } from "@/api/projects";
import { useState } from "react";
import { getImageUrl } from "@/api/client";

const isValidLink = (url?: string | null) => {
  return url && url.trim() !== "" && url !== "null" && url !== "undefined";
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectBySlug(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />
        <div className="container px-6 py-16 space-y-8">
          <div className="h-12 bg-muted rounded-xl w-48 animate-pulse" />
          <div className="h-8 bg-muted rounded-lg w-3/4 animate-pulse" />
          <div className="aspect-video bg-muted rounded-2xl animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-muted/50 rounded w-full animate-pulse" />
            <div className="h-4 bg-muted/50 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-muted/50 rounded w-4/6 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-heading font-bold">Project Not Found</h1>
          <button onClick={() => navigate("/")} className="cyber-button">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const gallery = project.gallery.map(g => g.image_path);

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />
      <motion.div
        className="fixed top-20 right-20 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-cyan) / 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 glass-card border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex gap-3">
            {isValidLink(project.demo_url) && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Watch Demo"
              >
                <Play className="w-5 h-5 text-cyber-emerald" />
              </a>
            )}
            {isValidLink(project.github_url) && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {isValidLink(project.live_url) && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="container px-6 py-16">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-body bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold">
              <span className="gradient-text">{project.title}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Main image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden glass-card"
                layoutId={`project-${project.slug}`}
              >
                <motion.img
                  src={getImageUrl(gallery[selectedImage])}
                  alt={`${project.title} screenshot ${selectedImage + 1}`}
                  className="w-full h-auto"
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {gallery.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden transition-all ${
                        selectedImage === index
                          ? "ring-2 ring-cyber-cyan glow-cyan"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Details */}
      <section className="container px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Description */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold">About This Project</h2>
              <p className="text-muted-foreground font-body leading-relaxed text-lg">
                {project.full_description}
              </p>
            </div>

            {/* Features */}
            {project.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-semibold">Key Features</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 glass-card p-4 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyber-emerald/20 border border-cyber-emerald/30">
                        <Check className="w-4 h-4 text-cyber-emerald" />
                      </div>
                      <span className="font-body text-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Tech stack sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-card p-6 rounded-2xl space-y-6 sticky top-24">
              <h3 className="text-xl font-heading font-semibold">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 rounded-lg glass-card text-sm font-body text-foreground border border-border hover:border-cyber-cyan/50 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4 space-y-3">
                {isValidLink(project.demo_url) && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 font-heading font-semibold rounded-lg border border-cyber-emerald/30 text-cyber-emerald hover:bg-cyber-emerald/10 transition-all duration-300"
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </a>
                )}
                {isValidLink(project.live_url) && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-button w-full flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </a>
                )}
                {isValidLink(project.github_url) && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 font-heading font-semibold rounded-lg border border-border hover:border-primary transition-all duration-300 hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer navigation */}
      <section className="container px-6 py-16 border-t border-border">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate("/#projects")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Projects</span>
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default ProjectDetail;