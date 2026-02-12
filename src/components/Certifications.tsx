import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
}

// Sample certificates data - Replace with your actual certificates
const certificates: Certificate[] = [
  {
    id: 1,
    title: "Dasar Pemograman Web",
    issuer: "Dicoding",
    description: "develop website development skills to a more advanced level",
    credentialId: "1OP8JG37VPQK",
    credentialUrl: "https://www.dicoding.com/certificates/1OP8JG37VPQK",
    image: "/certificates/sertif1.png", // Tambahkan path gambar Anda
    skills: ["html", "css"]
  },
  {
    id: 2,
    title: "Dasar AI",
    issuer: "Dicoding",
    description: "examine various basic concepts in AI and their applications.",
    credentialId: "53XEKVGQVXRN",
    credentialUrl: "https://www.dicoding.com/certificates/53XEKVGQVXRN",
    image: "/certificates/sertif2.png",
    skills: ["Python", "Data Analysis", "Machine Learning", "Deep Learning"]
  },
  {
    id: 3,
    title: "Google Cloud Fundamentals",
    issuer: "Dicoding",
    description: "Explore the basic concepts of Google Cloud and its core services.",
    credentialId: "MRZMW54VRPYQ",
    credentialUrl: "https://www.dicoding.com/certificates/MRZMW54VRPYQ",
    image: "/certificates/sertif3.png",
    skills: ["Cloud Computing", "Storage & Database", "Cost & Billing"]
  },
  {
    id: 4,
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding",
    description: "building a strong understanding of the basic principles of financial literacy, applying them in everyday financial decision-making, and designing long-term financial strategies.",
    credentialId: "ERZR2R28QPYV",
    credentialUrl: "https://www.dicoding.com/certificates/ERZR2R28QPYV",
    image: "/certificates/sertif4.png",
    skills: ["Financial Literacy", "Personal Financial Management", "Financial Planning"]
  },
  {
    id: 5,
    title: "Mastering Basic Excel Formulas",
    issuer: "Jobstreet",
    description: "Foundational understanding of Excel formulas and functions.",
    credentialId: "JOBSTREET-EXCEL-2026",
    image: "/certificates/sertif5.png",
    skills: ["Excel", "Data Analysis", "Spreadsheet Functions"]
  },
  {
    id: 6,
    title: "Basic Data Science Training",
    issuer: "Jobstreet",
    description: "Foundational understanding of data science concepts and techniques.",
    credentialId: "JOBSTREET-DATASCIENCE-2026",
    image: "/certificates/sertif6.png",
    skills: ["Data Science", "Python", "Data Visualization", "Statistical Analysis"]
  }
];

const CertificateCard = ({ certificate, index, isInView }: { certificate: Certificate; index: number; isInView: boolean }) => {
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
            src={certificate.image}
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
        {certificate.credentialId && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-body mb-2">
              Credential ID: <span className="text-foreground font-mono">{certificate.credentialId}</span>
            </p>
            {certificate.credentialUrl && (
              <motion.a
                href={certificate.credentialUrl}
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

        {/* Certificates Grid */}
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