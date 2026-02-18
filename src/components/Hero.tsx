import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ArrowDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/malik-hakim", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/malik-hakim03/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/likhkm_03/", label: "Instagram" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0 cyber-dots opacity-30" />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-cyan) / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-emerald) / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
              <span className="text-sm text-muted-foreground font-body">
                Available for projects
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Crafting{" "}
                <span className="gradient-text">Digital</span>
                <br />
                Experiences
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground font-body max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Full Stack Developer specializing in building exceptional web applications 
                with modern technologies and clean, scalable code.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a href="#projects" className="cyber-button">
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 font-heading font-semibold rounded-lg border border-border hover:border-primary transition-all duration-300 hover:bg-primary/10"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-foreground" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Profile */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--cyber-cyan)), hsl(var(--cyber-emerald)), hsl(var(--cyber-cyan)))",
                  padding: "4px",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </motion.div>

              {/* Profile image container */}
              <motion.div
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass-card flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 30px hsl(var(--cyber-cyan) / 0.2)",
                    "0 0 60px hsl(var(--cyber-cyan) / 0.3)",
                    "0 0 30px hsl(var(--cyber-cyan) / 0.2)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Profile photo */}
                <img 
                  src={profilePhoto} 
                  alt="M Malik Hakim AR" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-lg glass-card"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-sm font-heading font-semibold gradient-text">3+ Years</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-lg glass-card"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <span className="text-sm font-heading font-semibold gradient-text">10+ Projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs font-body uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
