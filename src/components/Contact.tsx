import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, AlertCircle } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // State untuk form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // GANTI DENGAN TOKEN DAN CHAT ID ANDA
  const TELEGRAM_BOT_TOKEN = '7996870311:AAGN5Tkq9uvc8jyJINTPir2GWuEyYz4N1c0';
  const TELEGRAM_CHAT_ID = '1188485198';

  const socialLinks = [
    { icon: Github, href: "https://github.com/malik-hakim", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/malik-hakim03/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/likhkm_03/", label: "Instagram" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendToTelegram = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // Validasi
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      setIsLoading(false);
      return;
    }

    // Format pesan untuk Telegram
    const telegramMessage = `
🔔 *New Contact Form Submission*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📋 *Subject:* ${formData.subject || 'No subject'}

💬 *Message:*
${formData.message}

━━━━━━━━━━━━━━━━━━━━
Sent from Portfolio Website
    `.trim();

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
          })
        }
      );

      const data = await response.json();

      if (data.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.description || 'Failed to send message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.'
      });
      console.error('Telegram Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-cyan) / 0.15) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyber-emerald) / 0.15) 0%, transparent 70%)",
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
              Get in Touch
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Email */}
              <motion.a
                href="mailto:malikhakim030505@gmail.com"
                className="flex items-center gap-4 glass-card-hover p-6 rounded-2xl group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyber-cyan/20 to-cyber-emerald/20 border border-cyber-cyan/30 group-hover:glow-cyan transition-all">
                  <Mail className="w-6 h-6 text-cyber-cyan" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">Email me at</p>
                  <p className="font-heading font-semibold text-foreground">malikhakim030505@gmail.com</p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                className="flex items-center gap-4 glass-card p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyber-cyan/20 to-cyber-emerald/20 border border-cyber-cyan/30">
                  <MapPin className="w-6 h-6 text-cyber-cyan" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">Based in</p>
                  <p className="font-heading font-semibold text-foreground">Indramayu, Indonesia</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground font-body">Follow me on</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-foreground" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            className="glass-card p-8 rounded-2xl space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={sendToTelegram}
          >
            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-4 rounded-xl ${
                  status.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-500'
                    : 'bg-red-500/10 border border-red-500/30 text-red-500'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p className="text-sm font-body">{status.message}</p>
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-body text-muted-foreground">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20 transition-all font-body text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-body text-muted-foreground">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20 transition-all font-body text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-body text-muted-foreground">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Project inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20 transition-all font-body text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-body text-muted-foreground">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20 transition-all font-body text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="cyber-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;