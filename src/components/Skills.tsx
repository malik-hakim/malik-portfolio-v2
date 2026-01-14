import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

// Official Laravel Logo SVG
const LaravelIcon = () => (
  <svg viewBox="0 0 50 52" className="w-8 h-8">
    <path fill="#FF2D20" d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.481L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z"/>
  </svg>
);

// Official Python Logo SVG
const PythonIcon = () => (
  <svg viewBox="0 0 256 255" className="w-8 h-8">
    <defs>
      <linearGradient id="python-a" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%">
        <stop offset="0%" stopColor="#387EB8"/>
        <stop offset="100%" stopColor="#366994"/>
      </linearGradient>
      <linearGradient id="python-b" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%">
        <stop offset="0%" stopColor="#FFE052"/>
        <stop offset="100%" stopColor="#FFC331"/>
      </linearGradient>
    </defs>
    <path fill="url(#python-a)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"/>
    <path fill="url(#python-b)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"/>
  </svg>
);

// React Logo SVG
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.232 23 20.463" className="w-8 h-8">
    <circle r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

// HTML/CSS Logo SVG
const HtmlCssIcon = () => (
  <svg viewBox="0 0 512 512" className="w-8 h-8">
    <path fill="#E44D26" d="M107.644 470.877L74.633 100.62h362.734l-33.046 370.199L255.778 512z"/>
    <path fill="#F16529" d="M256 480.523l120.03-33.277 28.24-316.352H256z"/>
    <path fill="#EBEBEB" d="M256 268.217h-60.09l-4.15-46.501H256v-45.411H142.132l1.087 12.183 11.161 125.139H256zM256 386.153l-.199.053-50.574-13.656-3.233-36.217h-45.585l6.362 71.301 93.02 25.823.209-.058z"/>
    <path fill="#fff" d="M255.843 268.217v45.41h55.918l-5.271 58.894-50.647 13.67v47.244l93.094-25.801.683-7.672 10.671-119.551 1.108-12.194h-12.237zM255.843 176.305v45.411h109.688l.911-10.207 2.069-23.021 1.086-12.183z"/>
  </svg>
);

// SQL Database Logo SVG
const DatabaseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8">
    <ellipse cx="50" cy="20" rx="40" ry="15" fill="#00758F"/>
    <path d="M10 20v60c0 8.284 17.909 15 40 15s40-6.716 40-15V20c0 8.284-17.909 15-40 15S10 28.284 10 20z" fill="#00758F"/>
    <ellipse cx="50" cy="20" rx="40" ry="15" fill="#00A9D4" opacity="0.6"/>
    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#00A9D4" strokeWidth="2" opacity="0.4"/>
    <ellipse cx="50" cy="65" rx="40" ry="15" fill="none" stroke="#00A9D4" strokeWidth="2" opacity="0.3"/>
  </svg>
);

const skills: Skill[] = [
  { name: "Laravel", percentage: 93, color: "from-red-500 to-orange-500", icon: <LaravelIcon /> },
  { name: "Python", percentage: 87, color: "from-yellow-500 to-blue-500", icon: <PythonIcon /> },
  { name: "HTML/CSS", percentage: 95, color: "from-orange-500 to-pink-500", icon: <HtmlCssIcon /> },
  { name: "SQL Databases", percentage: 88, color: "from-blue-500 to-cyan-500", icon: <DatabaseIcon /> },
  { name: "React", percentage: 60, color: "from-cyan-400 to-blue-500", icon: <ReactIcon /> },
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
          <div className="mb-1">{skill.icon}</div>
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
          <div className="w-6 h-6">{skill.icon}</div>
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
