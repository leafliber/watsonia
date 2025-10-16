import { motion } from 'framer-motion';

interface Orb {
  id: number;
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  delay: number;
}

// 在组件外定义静态数据，避免每次渲染重新创建
const orbsConfig: Orb[] = [
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
    delay: 1.3,
  },
  {
    id: 3,
    size: 700,
    color: 'rgb(236, 72, 153)', // pink
    initialX: '50%',
    initialY: '50%',
    delay: 2.7,
  },
  {
    id: 4,
    size: 400,
    color: 'rgb(34, 197, 94)', // green
    initialX: '66%',
    initialY: '33%',
    delay: 4.2,
  },
];

// 在组件外定义动画配置函数，避免重新创建
const getAnimationConfig = (id: number) => {
    switch (id) {
      case 1: // Purple - 快速螺旋运动
        return {
          x: [0, 70, 40, -50, -80, 30, 0],
          y: [0, -60, -90, -40, 50, 70, 0],
          scale: [1, 1.25, 0.95, 1.1, 0.8, 1.15, 1],
          opacity: [0.3, 0.5, 0.35, 0.45, 0.25, 0.4, 0.3],
          duration: 18,
        };
      case 2: // Blue - 缓慢波浪运动
        return {
          x: [0, -40, -70, -30, 50, 80, 0],
          y: [0, 60, 30, -70, -50, 40, 0],
          scale: [1, 0.85, 1.2, 0.9, 1.3, 0.95, 1],
          opacity: [0.3, 0.4, 0.5, 0.3, 0.45, 0.35, 0.3],
          duration: 25,
        };
      case 3: // Pink - 呼吸式脉动
        return {
          x: [0, 30, -20, 50, -40, 20, 0],
          y: [0, -50, 40, -30, 60, -20, 0],
          scale: [1, 1.35, 0.75, 1.25, 0.8, 1.15, 1],
          opacity: [0.3, 0.55, 0.2, 0.5, 0.3, 0.45, 0.3],
          duration: 22,
        };
      case 4: // Green - 不规则漂浮
        return {
          x: [0, -60, 80, -30, 90, -50, 0],
          y: [0, 80, -40, 70, -80, 30, 0],
          scale: [1, 0.9, 1.4, 0.85, 1.2, 0.95, 1],
          opacity: [0.35, 0.25, 0.5, 0.4, 0.3, 0.45, 0.35],
          duration: 28,
        };
      default:
        return {
          x: [0, 60, -40, 80, -60, 0],
          y: [0, -80, -40, 60, -30, 0],
          scale: [1, 1.2, 0.9, 1.15, 0.85, 1],
          opacity: [0.3, 0.5, 0.25, 0.45, 0.35, 0.3],
          duration: 20,
        };
    }
  };

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -5 }}>
      {orbsConfig.map((orb) => {
        const animConfig = getAnimationConfig(orb.id);
        return (
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
              opacity: animConfig.opacity[0],
              scale: 1,
              backgroundColor: orb.color,
            }}
            animate={{
              x: animConfig.x,
              y: animConfig.y,
              scale: animConfig.scale,
              opacity: animConfig.opacity,
              backgroundColor: [
                orb.color,
                adjustColor(orb.color, 1.3),
                adjustColor(orb.color, 0.7),
                adjustColor(orb.color, 1.15),
                adjustColor(orb.color, 0.85),
                orb.color,
              ],
            }}
            transition={{
              duration: animConfig.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              zIndex: orb.id === 3 ? 3 : 1,
            }}
          />
        );
      })}
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
