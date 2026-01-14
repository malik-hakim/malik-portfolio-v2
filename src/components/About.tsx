import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layers, Rocket, Lightbulb } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time",
    },
    {
      icon: Layers,
      title: "Full Stack",
      description: "From database design to pixel-perfect frontends",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed and exceptional user experience",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing new technologies and creative solutions",
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-dots opacity-20" />
      
      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
              <span className="text-sm text-muted-foreground font-body uppercase tracking-widest">
                About Me
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl md:text-5xl font-heading font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Turning Ideas Into{" "}
              <span className="gradient-text">Reality</span>
            </motion.h2>

            {/* Story */}
            <motion.div
              className="space-y-4 text-muted-foreground font-body leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p>
                Hi, I'm <span className="text-foreground font-semibold">M Malik Hakim AR</span>, 
                a passionate Full Stack Developer with over 5 years of experience crafting 
                digital solutions that make a difference.
              </p>
              <p>
                My journey began with a curiosity for how things work on the web, which 
                evolved into a deep expertise in backend systems with Laravel and Python, 
                complemented by modern frontend development with React.
              </p>
              <p>
                I believe in writing code that not only works but is elegant, maintainable, 
                and scalable. Every project is an opportunity to push boundaries and deliver 
                exceptional experiences.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "50+", label: "Projects Completed" },
                { value: "30+", label: "Happy Clients" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <span className="block text-3xl font-heading font-bold gradient-text">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground font-body">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Highlights grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-card-hover p-6 space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyber-cyan/20 to-cyber-emerald/20 border border-cyber-cyan/30">
                  <item.icon className="w-6 h-6 text-cyber-cyan" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
