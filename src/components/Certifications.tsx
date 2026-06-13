import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink, Building2 } from "lucide-react";
import { fetchCertificates, type ApiCertificate } from "@/api/certificates";
import { getImageUrl } from "@/api/client";

const CertificateCard = ({ certificate, index, isInView }: { certificate: ApiCertificate; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="glass-card-hover p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Certificate Icon/Image */}
      <div className="relative mb-4 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-cyber-cyan/10 to-cyber-emerald/10">
        {certificate.image && !imageError ? (
          <motion.img
            src={getImageUrl(certificate.image)}
            alt={certificate.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            onError={() => setImageError(true)}
          />
        ) : (
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Award className="w-20 h-20 text-cyber-cyan" strokeWidth={1.5} />
          </motion.div>
        )}
        
        {/* Overlay gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 px-3 py-1 rounded-full glass-card text-xs font-body text-muted-foreground backdrop-blur-sm">
        </div>
      </div>

      {/* Certificate Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">
          {certificate.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Building2 className="w-4 h-4" />
          <span className="font-body">{certificate.issuer}</span>
        </div>

        <p className="text-sm text-muted-foreground font-body mb-4 flex-1">
          {certificate.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {certificate.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-md bg-cyber-cyan/10 text-cyber-cyan text-xs font-body"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Credential Info */}
        {certificate.credential_id && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-body mb-2">
              Credential ID: <span className="text-foreground font-mono">{certificate.credential_id}</span>
            </p>
            {certificate.credential_url && (
              <motion.a
                href={certificate.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-body text-cyber-cyan hover:text-cyber-emerald transition-colors"
                whileHover={{ x: 5 }}
              >
                View Credential
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ["certificates"],
    queryFn: fetchCertificates,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section id="certifications" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-emerald) / 0.1) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
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
              Achievements
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Certifications & <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Professional certifications and courses completed to enhance my skills and knowledge
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="h-48 bg-muted m-6 rounded-lg" />
                <div className="px-6 pb-6 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted/50 rounded w-1/2" />
                  <div className="h-12 bg-muted/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificates Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
         
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;