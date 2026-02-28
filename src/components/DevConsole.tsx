import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const codeSnippet = `const codeSnippet = `// auth.schema.js — HMS Project

const ROLES = {
  ADMIN: ['read', 'write', 'delete', 'manage_users'],
  MANAGER: ['read', 'write', 'manage_orders'],
  STAFF: ['read', 'create_orders']
};

const validateAccess = (user, permission) => {
  if (!user?.role || !ROLES[user.role.toUpperCase()]) {
    return false;
  }
  
  const permissions = ROLES[user.role.toUpperCase()];
  return permissions.includes(permission);
};

module.exports = { ROLES, validateAccess };`;

`;

const syntaxHighlight = (code: string) => {
  return code
    .replace(/(\/\/.*)/g, '<span class="text-muted-foreground">$1</span>')
    .replace(/\b(interface|const|export|return)\b/g, '<span class="text-purple-600">$1</span>')
    .replace(/\b(string|boolean|Record)\b/g, '<span class="text-blue-600">$1</span>')
    .replace(/('admin'|'manager'|'staff'|'read'|'write'|'delete'|'manage_users'|'manage_orders'|'create_orders')/g, '<span class="text-green-600">$1</span>')
    .replace(/\b(UserRole|Permission|User)\b/g, '<span class="text-amber-600">$1</span>')
    .replace(/\b(rolePermissions|user|userPermissions|requiredPermission)\b/g, '<span class="text-slate-700">$1</span>');
};

const DevConsole = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isInView && currentIndex < codeSnippet.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(codeSnippet.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 12);
      return () => clearTimeout(timeout);
    }
  }, [isInView, currentIndex]);

  return (
    <section className="py-24 px-6 bg-muted/30" ref={ref}>
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            The Dev Console
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            Code that powers the systems
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-light rounded-xl overflow-hidden"
        >
          {/* Window Header - Light Theme */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="ml-4 text-xs text-muted-foreground font-mono">
              auth.schema.ts — HMS Project
            </span>
          </div>

          {/* Code Content - Light Theme */}
          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-background">
            <pre className="text-foreground">
              <code 
                dangerouslySetInnerHTML={{ 
                  __html: syntaxHighlight(displayedCode) + (currentIndex < codeSnippet.length ? '<span class="cursor-blink text-primary">|</span>' : '')
                }} 
              />
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevConsole;
