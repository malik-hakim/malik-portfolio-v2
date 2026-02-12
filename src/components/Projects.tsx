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
    description: "An IoT-based smart aquarium monitoring system designed specifically for guppy fish farming.",
    image: "/images/web1.png",
    tags: ["Python Flask", " ESP32"," REST API"],
    github: "https://github.com/malik-hakim/dasboard-monitoring-aquarium-berbasis-iot",
    fullDescription: "This system integrates multiple sensors (pH sensor and DS18B20 temperature sensor) with ESP32 microcontroller to provide real-time water quality monitoring through a web dashboard. The system features automated pH correction using a peristaltic pump and scheduled automatic feeding with a servo motor. Built with Flask backend and responsive HTML/CSS/JavaScript frontend, it enables aquarists to maintain optimal water conditions remotely while ensuring consistent fish feeding schedules. All data is logged and visualized with interactive charts for historical analysis.",
    gallery: [
      "/images/cover_project1.png",
      "/images/project1a.png",
      "/images/project1b.jpeg",
    ],
    techStack: ["Python Flask", " ESP32", "JavaScript", "HTML/CSS", "JSON Database", " REST API"],
    features: ["Real-time Water Monitoring", "Auto pH Treatment System", "Scheduled Auto Feeding", "Interactive Web Dashboard"],
  },
  {
    id: "mini-library-smart-city",
    title: "Mini Library Smart City",
    description: "An interactive educational website about Smart City concepts featuring smooth scrolling animations, comprehensive information about smart city pillars, and real-world implementation examples in Wonosobo with audio-guided exploration.",
    image: "/images/web2.png",
    tags: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/malik-hakim/mini_library_v2",
    live: "https://malik-hakim.github.io/mini_library_v2/",
    fullDescription: "A comprehensive interactive web platform designed to educate visitors about Smart City concepts through engaging visual experiences and real-world case studies. The website features advanced GSAP-powered scroll animations that create an immersive journey through different aspects of smart cities. It showcases the six pillars of Smart City (Governance, Environment, Living, Branding, Economy, and Society) with detailed information and interactive elements.",
    gallery: [
      "/images/cover_project2.png",
      "/images/project2a.png",
      "/images/project2b.png",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "GSAP 3.12", "ScrollTrigger", "Font Awesome 6.6", "HTML5 Audio API"],
    features: ["GSAP Scroll Animations", " 6 Smart City Pillars Showcase", "11 Real Implementation Case Studies", " Audio-Guided Exploration System"],
  },
  {
    id: "drowsiness-vehicle-detection-system",
    title: "Drowsiness Vehicle Detection System",
    description: "A real-time dual camera monitoring system that combines drowsiness detection using facial landmarks and vehicle detection using YOLOv8, with Flask web interface for remote monitoring and control.",
    image: "/images/web3.png",
    tags: ["Python Flask", "OpenCV", "MediaPipe"],
    fullDescription: "An advanced computer vision application that provides simultaneous monitoring through two camera sources for different detection purposes. The first camera uses MediaPipe Face Mesh to detect driver drowsiness by calculating Eye Aspect Ratio (EAR), triggering audio alarms when eyes remain closed beyond a configurable threshold. The second camera employs YOLOv8 object detection to identify and count vehicles (cars, motorcycles, buses, trucks) in real-time from IP camera streams.The system features a responsive Flask web dashboard with dark/light theme support, live video streaming using MJPEG, threaded camera capture for optimal performance, and comprehensive controls including alarm management, camera restart functionality, and dynamic IP camera URL configuration. The interface includes real-time statistics tracking system uptime, detection events, active cameras, and overall health status. Both detection streams support fullscreen viewing and provide visual overlays with detection confidence scores, bounding boxes, and classification labels.",
    gallery: [
      "/images/cover_project3.png",
      "/images/project3a.png",
    ],
    techStack: ["Python Flask", "OpenCV", "MediaPipe", "YOLOv8 (Ultralytics)", "Pygame", "HTML5/CSS3/JavaScript", "Threading", "MJPEG Streaming"],
    features: ["MediaPipe Face Mesh ML Model", " YOLOv8 Deep Learning Detection", "Real-time Dual Camera Streaming", "Automated Audio Alarm System"],
  },
  {
    id: "Fitness-Tracker-App",
    title: "Fitness Tracker App",
    description: "A comprehensive fitness tracking application with real-time health monitoring and personalized workout plans.",
    image: "/images/web4.png",
    tags: ["Python Flask", "MySQL", "bcrypt"],
    github: "https://github.com",
    fullDescription: "A full-stack web application designed to help users achieve their fitness goals through systematic tracking and data-driven recommendations. The system calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation and Total Daily Energy Expenditure (TDEE) based on activity levels. Users can set personalized goals (weight loss, gain, or maintenance) and receive tailored daily calorie targets.",
    gallery: [
      "/images/project4a.png",
      "/images/project4b.png",
      "/images/project4c.png",
    ],
    techStack: ["Python Flask", "MySQL", "bcrypt", "HTML5/CSS3", "JavaScript", "Session Management", "Mifflin-St Jeor Formula", "MET Calculation"],
    features: ["BMR & TDEE Calculator", "Personalized Calorie Goals", "Weekly Progress Tracking", "MET-Based Exercise Logging"],
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
              {/* Image - CHANGED: Removed fixed height and added object-contain */}
              <div className="relative overflow-hidden bg-background/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-contain transition-transform duration-300"
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