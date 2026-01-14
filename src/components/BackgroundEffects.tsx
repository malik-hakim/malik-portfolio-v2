import { motion } from "framer-motion";

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyber-cyan/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-64 h-64 border border-cyber-cyan/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[25%] right-[12%] w-48 h-48 border border-cyber-emerald/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-[30%] left-[5%] w-32 h-32 border border-cyber-cyan/5"
        style={{ transform: "rotate(45deg)" }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[60%] right-[20%] w-24 h-24 border border-cyber-emerald/5"
        style={{ transform: "rotate(15deg)" }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [15, 25, 15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gradient lines */}
      <motion.div
        className="absolute top-[40%] left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--cyber-cyan) / 0.1), transparent)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[70%] left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--cyber-emerald) / 0.1), transparent)",
        }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-cyber-cyan/30 to-transparent" />
        <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-cyber-cyan/30 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-cyber-emerald/30 to-transparent" />
        <div className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-cyber-emerald/30 to-transparent" />
      </div>

      {/* Glow orbs - additional subtle glows */}
      <motion.div
        className="absolute top-[50%] left-[30%] w-96 h-96 rounded-full blur-[180px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-cyan) / 0.05) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default BackgroundEffects;
