import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  { name: "Laravel", percentage: 93, color: "from-red-500 to-orange-500", icon: "🔷" },
  { name: "Python", percentage: 87, color: "from-yellow-500 to-blue-500", icon: "🐍" },
  { name: "HTML/CSS", percentage: 95, color: "from-orange-500 to-pink-500", icon: "🎨" },
  { name: "SQL Databases", percentage: 88, color: "from-blue-500 to-cyan-500", icon: "🗄️" },
  { name: "React", percentage: 60, color: "from-cyan-400 to-blue-500", icon: "⚛️" },
];

const AnimatedCounter = ({ target, isInView }: { target: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isInView]);

  return <span>{count}%</span>;
};

const CircularProgress = ({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

  return (
    <motion.div
      className="glass-card-hover p-6 flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-28 h-28">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="56"
            cy="56"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
            style={{
              filter: "drop-shadow(0 0 8px hsl(var(--cyber-cyan) / 0.5))",
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--cyber-cyan))" />
              <stop offset="100%" stopColor="hsl(var(--cyber-emerald))" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl mb-1">{skill.icon}</span>
          <span className="text-xl font-heading font-bold gradient-text">
            <AnimatedCounter target={skill.percentage} isInView={isInView} />
          </span>
        </div>
      </div>
      
      <h3 className="font-heading font-semibold text-foreground">{skill.name}</h3>
    </motion.div>
  );
};

const SkillBar = ({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) => {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-xl">{skill.icon}</span>
          <span className="font-heading font-semibold text-foreground">{skill.name}</span>
        </div>
        <span className="font-heading font-bold gradient-text">
          <AnimatedCounter target={skill.percentage} isInView={isInView} />
        </span>
      </div>
      
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-cyan) / 0.1) 0%, transparent 70%)",
        }}
      />

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
            <span className="w-2 h-2 rounded-full bg-cyber-emerald" />
            <span className="text-sm text-muted-foreground font-body uppercase tracking-widest">
              Technical Skills
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Proficient in a wide range of technologies, from backend frameworks to frontend libraries
          </p>
        </motion.div>

        {/* Skills display - Circular gauges for desktop */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 mb-16">
          {skills.map((skill, index) => (
            <CircularProgress
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Skills display - Bar chart for mobile */}
        <div className="md:hidden glass-card p-6 space-y-6">
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Additional technologies */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground font-body mb-4">
            Also experienced with:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Git", "Docker", "REST APIs", "PostgreSQL", "MySQL", "Tailwind CSS", "TypeScript", "Node.js"].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full glass-card text-sm font-body text-foreground hover:border-primary/50 transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
