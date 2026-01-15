import { motion } from 'framer-motion';
import { ArrowDown, CircleArrowDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import profilePhoto from '@/assets/profile-photo.jpeg';
import videoMp4 from '@/assets/Gif - Trim.mp4';
import myResume from '@/assets/Sameer Sharma Resume.pdf';

const titles = [
  "Full Stack Developer",
  "Scalable Systems Architect",
  "React & TypeScript Specialist"
];

const HeroSection = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // Mobile tap state

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTitle.length) {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex]);

  const handleToggleFlip = () => {
    const nextState = !isFlipped;
    setIsFlipped(nextState);
    
    if (videoRef.current) {
      if (nextState) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="min-h-screen flex items-center px-6 py-20 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-charcoal mb-4 tracking-tight">
              Sameer Sharma
            </motion.h1>

            <div className="h-8 mb-6">
              <span className="text-xl text-primary font-semibold">
                {displayedText}
                <span className="cursor-blink text-primary">|</span>
              </span>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Crafting scalable, user-centric interfaces at ATS Global Tech.
              Specializing in secure backend systems and intuitive hospitality software.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white font-semibold rounded-lg hover:bg-charcoal/90 transition-all shadow-sm">
                Explore Projects <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href={myResume}
                download="Sameer Sharma's Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-silver text-foreground font-semibold rounded-lg hover:bg-muted transition-all cursor-pointer"
              >
                <CircleArrowDown className="w-8 h-8 object-cover" />
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div
              className="relative group perspective-1000 cursor-pointer md:cursor-default"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleToggleFlip}
            >
              <div className={`relative w-72 h-72 md:w-96 md:h-96 transition-transform duration-700 transform-style-3d 
                ${isFlipped ? 'rotate-y-180' : ''} md:group-hover:rotate-y-180`}>

                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg backface-hidden border border-border bg-white">
                  <img src={profilePhoto} alt="Sameer Sharma" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full md:hidden">
                    Tap to Flip
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl bg-charcoal flex flex-col items-center justify-center shadow-lg backface-hidden rotate-y-180 border border-border overflow-hidden">
                  <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  >
                    <source src={videoMp4} type="video/mp4" />
                  </video>

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <span className="text-6xl md:text-7xl font-bold text-white mb-2">7+</span>
                    <span className="text-xl md:text-2xl font-semibold text-white/90">Months</span>
                    <span className="text-lg text-white/70 mt-1">Experienced</span>
                    <div className="mt-4 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm backdrop-blur-md border border-white/10">
                      Full Stack Developer
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 top-4 left-4 w-72 h-72 md:w-96 md:h-96 rounded-3xl border-2 border-silver/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;