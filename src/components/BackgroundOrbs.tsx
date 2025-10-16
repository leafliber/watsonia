import { motion } from 'framer-motion';

interface Orb {
  id: number;
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  delay: number;
}

export default function BackgroundOrbs() {
  const orbs: Orb[] = [
    {
      id: 1,
      size: 500,
      color: 'rgb(147, 51, 234)', // purple
      initialX: '25%',
      initialY: '25%',
      delay: 0,
    },
    {
      id: 2,
      size: 500,
      color: 'rgb(59, 130, 246)', // blue
      initialX: '75%',
      initialY: '75%',
      delay: 1,
    },
    {
      id: 3,
      size: 700,
      color: 'rgb(236, 72, 153)', // pink
      initialX: '50%',
      initialY: '50%',
      delay: 2,
    },
    {
      id: 4,
      size: 400,
      color: 'rgb(34, 197, 94)', // green
      initialX: '66%',
      initialY: '33%',
      delay: 1.5,
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -5 }}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          initial={{
            left: orb.initialX,
            top: orb.initialY,
            width: orb.size,
            height: orb.size,
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
            opacity: 0.3,
            scale: 1,
            backgroundColor: orb.color,
          }}
          animate={{
            x: [0, 60, -40, 80, -60, 0],
            y: [0, -80, -40, 60, -30, 0],
            scale: [1, 1.2, 0.9, 1.15, 0.85, 1],
            opacity: [0.3, 0.5, 0.25, 0.45, 0.35, 0.3],
            backgroundColor: [
              orb.color,
              adjustColor(orb.color, 1.2),
              adjustColor(orb.color, 0.8),
              adjustColor(orb.color, 1.1),
              orb.color,
            ],
          }}
          transition={{
            duration: 20,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            zIndex: orb.id === 3 ? 3 : 1,
          }}
        />
      ))}
    </div>
  );
}

// Helper function to adjust color brightness
function adjustColor(color: string, factor: number): string {
  const rgb = color.match(/\d+/g);
  if (!rgb) return color;
  
  const [r, g, b] = rgb.map(Number);
  const newR = Math.min(255, Math.round(r * factor));
  const newG = Math.min(255, Math.round(g * factor));
  const newB = Math.min(255, Math.round(b * factor));
  
  return `rgb(${newR}, ${newG}, ${newB})`;
}
