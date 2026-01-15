import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useState } from 'react';

// Icons import
import ExpressIcon from '@/assets/Express-js.png';
import GitIcon from '@/assets/Git.png';
import JSIcon from '@/assets/Javascript.png';
import MongoIcon from '@/assets/Mongo-db.png';
import MySQLIcon from '@/assets/MySQL.png';
import NodeIcon from '@/assets/Node-js.png';
import ReactIcon from '@/assets/React.png';
import TailwindIcon from '@/assets/Tailwind-css.png';
import TSIcon from '@/assets/TS.png';
import ReduxIcon from '@/assets/redux-logo.webp';

const skills = [
  { name: "React",      color: "#61DAFB", level: "Advanced",     percentage: 90, icon: ReactIcon },
  { name: "TypeScript", color: "#3178C6", level: "Intermediate", percentage: 80, icon: TSIcon },
  { name: "Redux",      color: "#764ABC", level: "Intermediate", percentage: 75, icon: ReduxIcon },
  { name: "Node.js",    color: "#339933", level: "Advanced",     percentage: 85, icon: NodeIcon },
  { name: "Express",    color: "#000000", level: "Advanced",     percentage: 88, icon: ExpressIcon },
  { name: "MongoDB",    color: "#47A248", level: "Intermediate", percentage: 70, icon: MongoIcon },
  { name: "MySQL",      color: "#4479A1", level: "Intermediate", percentage: 65, icon: MySQLIcon },
  { name: "Tailwind",   color: "#06B6D4", level: "Expert",       percentage: 95, icon: TailwindIcon },
];

const ITEM_COUNT = skills.length;
const ANGLE_STEP = 360 / ITEM_COUNT;
const RADIUS = 420; 

const SkillCard3D = ({ 
  skill, 
  index, 
  rotation, 
  setIsHovered 
}: { 
  skill: typeof skills[0]; 
  index: number; 
  rotation: any; 
  setIsHovered: (v: boolean) => void 
}) => {
  const angle = ANGLE_STEP * index;
  const [currentRotation, setCurrentRotation] = useState(0);

  // Sync state with motion value for the counter-rotation
  useAnimationFrame(() => {
    setCurrentRotation(rotation.get());
  });

  return (
    <div
      className="absolute left-1/2 top-1/2 origin-center"
      style={{
        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${RADIUS}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: `rotateY(${-angle - currentRotation}deg)` }}>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -10, scale: 1.05 }}
          className="relative w-[190px] h-[250px] rounded-[2rem] bg-white border border-slate-200 flex flex-col items-center justify-between p-6 shadow-xl overflow-hidden cursor-pointer"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)', 
          }}
        >
          <div className="w-full flex justify-end">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 uppercase">
              {skill.level}
            </span>
          </div>

          <div className="w-20 h-20 flex items-center justify-center">
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>

          <div className="w-full text-center space-y-3">
            <h3 className="text-slate-800 font-bold text-base">{skill.name}</h3>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percentage}%` }}
                className="h-full"
                style={{ backgroundColor: skill.color }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Proficiency: {skill.percentage}%
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function SkillsMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = useMotionValue(0);

  // useAnimationFrame ensures rotation is frame-independent and doesn't reset on hover
  useAnimationFrame((_, delta) => {
    if (!isHovered) {
      const prevValue = rotation.get();
      // Delta-based calculation prevents speed jumps
      rotation.set((prevValue + delta * 0.01) % 360);
    }
  });

  return (
    <section className="py-24 overflow-hidden relative bg-slate-50">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      <div className="container mx-auto px-6 mb-24 text-center relative z-10">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.5em] mb-4">Expertise</h2>
        <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          My Technical <span className="text-blue-600 font-extrabold">Stack</span>
        </p>
      </div>

      <div
        className="relative h-[600px] flex justify-center items-center z-10"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          style={{
            rotateY: rotation,
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {skills.map((skill, index) => (
            <SkillCard3D 
              key={skill.name} 
              skill={skill} 
              index={index} 
              rotation={rotation} 
              setIsHovered={setIsHovered}
            />
          ))}
        </motion.div>
      </div>

      <p className="text-center text-slate-400 text-sm mt-10">Hover on a card to pause rotation</p>
    </section>
  );
}