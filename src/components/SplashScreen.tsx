import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      onAnimationComplete={onComplete}
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-cyan) / 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-[100px] -translate-x-32 translate-y-16"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-emerald) / 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyber-cyan)), hsl(var(--cyber-emerald)))",
              padding: "3px",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-background" />
          </motion.div>
          
          {/* Inner content */}
          <motion.div
            className="relative w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyber-cyan) / 0.1), hsl(var(--cyber-emerald) / 0.1))",
              border: "1px solid hsl(var(--glass-border) / 0.3)",
            }}
            animate={{
              boxShadow: [
                "0 0 20px hsl(var(--cyber-cyan) / 0.3), 0 0 40px hsl(var(--cyber-cyan) / 0.1)",
                "0 0 40px hsl(var(--cyber-cyan) / 0.5), 0 0 80px hsl(var(--cyber-cyan) / 0.2)",
                "0 0 20px hsl(var(--cyber-cyan) / 0.3), 0 0 40px hsl(var(--cyber-cyan) / 0.1)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="font-heading text-4xl font-bold gradient-text">MH</span>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            M Malik Hakim AR
          </h1>
          <motion.p
            className="mt-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Full Stack Developer
          </motion.p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-1 rounded-full overflow-hidden bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--cyber-cyan)), hsl(var(--cyber-emerald)))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
