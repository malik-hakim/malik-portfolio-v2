import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-heading text-2xl font-bold gradient-text">MH</span>
            <span className="text-muted-foreground font-body">|</span>
            <span className="text-sm text-muted-foreground font-body">M Malik Hakim AR</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-sm text-muted-foreground font-body flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {currentYear} Made with{" "}
            <Heart className="w-4 h-4 text-cyber-cyan fill-cyber-cyan animate-pulse" />{" "}
            All rights reserved.
          </motion.p>

          {/* Navigation */}
          <motion.nav
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground font-body hover:text-cyber-cyan transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
