import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  fullDescription: string;
  gallery: string[];
  techStack: string[];
  features: string[];
}

export const projectsData: Project[] = [
  {
    id: "smart-aquarium-iot-dashboard",
    title: "Smart Aquarium IoT Dashboard",
    description: "A smart aquarium monitoring system that tracks water quality, temperature, and fish activity.",
    image: "/images/cover_project1.png",
    tags: ["Laravel", "React", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
    fullDescription: "Built a comprehensive smart aquarium monitoring system that tracks water quality, temperature, and fish activity. Features include real-time alerts, data visualization, and remote management.",
    gallery: [
      "/images/cover_project1.png",
      "/images/project1a.png",
      "/images/project1b.jpeg",
    ],
    techStack: ["Laravel 10", "React 18", "PostgreSQL", "Redis", "Stripe API", "Docker"],
    features: ["Real-time inventory", "Multi-vendor support", "Analytics dashboard", "Payment integration"],
  },
  {
    id: "ai-analytics-dashboard",
    title: "AI Analytics Dashboard",
    description: "Machine learning powered analytics platform providing predictive insights for business intelligence.",
    image: "/images/cover_project2.png",
    tags: ["Python", "TensorFlow", "React"],
    github: "https://github.com/malik-hakim/mini_library_v2",
    live: "https://malik-hakim.github.io/mini_library_v2/",
    fullDescription: "Developed an AI-driven analytics platform that processes millions of data points to deliver actionable business insights. The system uses machine learning models for predictive analytics, anomaly detection, and trend forecasting.",
    gallery: [
      "/images/cover_project2.png",
      "/images/project2a.png",
      "/images/project2b.png",
    ],
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL", "AWS"],
    features: ["Predictive analytics", "Anomaly detection", "Real-time processing", "Custom ML models"],
  },
  {
    id: "project-management-suite",
    title: "Project Management Suite",
    description: "Collaborative workspace tool with real-time updates, task management, and team communication features.",
    image: "/images/cover_project3.png",
    tags: ["Laravel", "Vue.js", "MySQL"],
    live: "https://example.com",
    fullDescription: "Created a comprehensive project management platform that streamlines team collaboration. Features include Kanban boards, Gantt charts, time tracking, file sharing, and integrated video conferencing for remote teams.",
    gallery: [
      "/images/cover_project3.png",
      "/images/project3a.png",
    ],
    techStack: ["Laravel", "Vue.js 3", "MySQL", "WebSockets", "Redis", "Pusher"],
    features: ["Kanban boards", "Gantt charts", "Time tracking", "Video conferencing"],
  },
  {
    id: "healthcare-portal",
    title: "Healthcare Portal",
    description: "Secure patient management system with appointment scheduling, medical records, and telemedicine features.",
    image: "/images/cover_project4.png",
    tags: ["Python", "Django", "React"],
    github: "https://github.com",
    live: "https://example.com",
    fullDescription: "Built a HIPAA-compliant healthcare platform serving thousands of patients. The system includes secure messaging, appointment scheduling, prescription management, and integrated telemedicine capabilities with end-to-end encryption.",
    gallery: [
      "/images/cover_project4.png",
      "/images/project4a.png",
      "/images/project4b.png",
    ],
    techStack: ["Python", "Django", "React", "PostgreSQL", "WebRTC", "AWS"],
    features: ["HIPAA compliant", "Telemedicine", "E-prescriptions", "Secure messaging"],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

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

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
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
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                
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
                    {project.github && (
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
                    {project.live && (
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
      </div>
    </section>
  );
};

export default Projects;