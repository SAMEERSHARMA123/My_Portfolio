import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { useRef } from 'react';

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="bg-card p-4 rounded-xl flex items-center gap-3 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
  >
    <div className="p-2 rounded-lg bg-muted">
      <Icon className="w-5 h-5 text-muted-foreground" />
    </div>
    <span className="text-sm font-medium text-foreground">
      {label}
    </span>
  </motion.a>
);

const MagneticButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="mailto:jangidsameer26@gmail.com"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white font-semibold rounded-xl hover:bg-charcoal/90 transition-colors shadow-lg hover:shadow-xl"
    >
      <Send className="w-5 h-5" />
      Send Message
    </motion.a>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-muted/50">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
            Get in Touch
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's work together
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            Currently open for freelance projects and full-time opportunities.
          </p>
        </motion.div>

        {/* Magnetic Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <MagneticButton />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          <SocialLink 
            href="https://github.com/SAMEERSHARMA123" 
            icon={Github} 
            label="SAMEERSHARMA123" 
          />
          <SocialLink 
            href="https://linkedin.com/in/sameer-sharma-4u" 
            icon={Linkedin} 
            label="sameer-sharma-4u" 
          />
          <SocialLink 
            href="mailto:jangidsameer26@gmail.com" 
            icon={Mail} 
            label="jangidsameer26@gmail.com" 
          />
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-muted-foreground"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Bindayaka, Jaipur, Rajasthan</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
