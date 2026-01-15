import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

interface TimelineItem {
  type: 'work' | 'education' | 'certification';
  title: string;
  organization: string;
  period: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'ATS Global Tech',
    period: 'Oct 2025 – Present',
    description: 'Leading the full-stack development of the enterprise HMS ecosystem with role-based authentication and real-time features.',
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'Big Giant IT Solution',
    period: 'June 2025 – Sept 2025',
    description: 'Developed responsive web apps using MERN stack and handled bug fixes for existing applications.',
  },
  {
    type: 'education',
    title: 'Bachelor of Computer Applications',
    organization: 'Karani University, Rajasthan',
    period: '2025 – 2028',
    description: 'Pursuing BCA with focus on software development, system design, and computer science fundamentals.',
  },
  {
    type: 'certification',
    title: 'Diploma in Full Stack Development',
    organization: 'TMS Computer Classes, Jaipur',
    period: 'Completed',
    description: 'Comprehensive training in modern web technologies including React, Node.js, and database management.',
  },
];

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return Briefcase;
    case 'education':
      return GraduationCap;
    case 'certification':
      return Award;
  }
};

const getIconColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return 'text-primary bg-primary/10';
    case 'education':
      return 'text-secondary bg-secondary/10';
    case 'certification':
      return 'text-emerald-600 bg-emerald-50';
  }
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = getIcon(item.type);
  const iconColor = getIconColor(item.type);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, x: -10 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="relative pl-10 pb-12 last:pb-0"
    >
      {/* Timeline dot with icon */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
        className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 border-silver flex items-center justify-center shadow-sm"
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
      </motion.div>
      
      {/* Content */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{item.period}</span>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
        <p className="text-sm text-primary font-medium mb-3">{item.organization}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section className="py-24 px-6 bg-background" ref={containerRef}>
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
            Professional Journey
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            Experience & Education
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated silver vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-[11px] top-0 w-0.5 bg-gradient-to-b from-silver via-silver/50 to-transparent"
          />

          {/* Timeline Items */}
          <div>
            {timelineData.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
