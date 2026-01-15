import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="font-semibold text-foreground">Sameer Sharma</span>. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with <span className="text-primary">♥</span> using React & TypeScript
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
