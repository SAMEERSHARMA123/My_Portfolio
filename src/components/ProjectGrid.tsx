import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Shield, 
  Users, 
  UtensilsCrossed, 
  Wrench, 
  Receipt, 
  Layout, 
  ShieldCheck, 
  MailCheck 
} from 'lucide-react';

// Import images at the top (Vite supports this)
import LandingPageImg from '@/assets/Landing-Page.png';
import AdminDashboardImg from '@/assets/Screenshot (18).png';
import VerifyEmailImg from '@/assets/Verify-Email.png';
import RestaurantImg from '@/assets/Restaurant.png';

const hmsKeyFeatures = [
  {
    icon: Layout,
    title: "Elegant User Interface",
    description: "A modern and responsive landing page designed for seamless user onboarding",
    image: LandingPageImg,           // ← now imported variable
  },
  {
    icon: ShieldCheck,
    title: "Comprehensive Admin Panel",
    description: "Powerful dashboard to manage hotel operations, staff roles, and analytics",
    image: AdminDashboardImg,
  },
  {
    icon: MailCheck,
    title: "Secure Authentication",
    description: "Robust email verification system to ensure guest and staff account security",
    image: VerifyEmailImg,
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Management",
    description: "End-to-end POS system for table ordering, menu tracking, and kitchen workflow",
    image: RestaurantImg,
  },
];

// Rest of your component remains exactly the same
const ProjectGrid = () => {
  return (
    <section id="projects" className="py-20 md:py-28 px-5 md:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider mb-4">
            Featured Work
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Enterprise-Grade Hospitality Solutions
          </p>
        </motion.div>

        {/* HMS – Main Project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card rounded-2xl md:rounded-3xl overflow-hidden border border-border/60 shadow-xl mb-16 md:mb-24"
        >
          {/* Browser header */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-muted/70 border-b border-border">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center">
              <div className="inline-block bg-background/90 border border-border rounded-full px-5 py-1.5 text-sm font-mono text-muted-foreground">
                hms.atsglobaltech.in
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Hotel Management System</h3>
              <p className="text-lg text-muted-foreground">
                Complete solution for front office, F&B, housekeeping & billing
              </p>
            </div>

            <div className="space-y-16 md:space-y-24 lg:space-y-32">
              {hmsKeyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
                    index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Text */}
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-semibold">{feature.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Big Screenshot */}
                  <div
                    className={`group relative rounded-xl md:rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="aspect-[16/10] md:aspect-[16/9] bg-muted overflow-hidden"
                    >
                      <img
                        src={feature.image}           // ← now using imported variable
                        alt={`${feature.title} preview`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Demo CTA */}
            <div className="mt-16 md:mt-20 text-center">
              <a
                href="https://hms.atsglobaltech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
              >
                Try Live Demo
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectGrid;