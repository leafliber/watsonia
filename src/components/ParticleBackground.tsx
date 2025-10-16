import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Orb {
  id: number;
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  delay: number;
}

// 大型背景球体配置 - 桌面端
const orbsConfigDesktop: Orb[] = [
  { id: 1, size: 500, color: 'rgb(147, 51, 234)', initialX: '25%', initialY: '25%', delay: 0 },
  { id: 2, size: 500, color: 'rgb(59, 130, 246)', initialX: '75%', initialY: '75%', delay: 1.3 },
  { id: 3, size: 800, color: 'rgb(236, 72, 153)', initialX: '50%', initialY: '50%', delay: 2.7 },
];

// 大型背景球体配置 - 移动端（减小尺寸）
const orbsConfigMobile: Orb[] = [
  { id: 1, size: 100, color: 'rgb(147, 51, 234)', initialX: '25%', initialY: '25%', delay: 0 },
  { id: 2, size: 100, color: 'rgb(59, 130, 246)', initialX: '75%', initialY: '75%', delay: 1.3 },
  { id: 3, size: 300, color: 'rgb(236, 72, 153)', initialX: '50%', initialY: '50%', delay: 2.7 },
];

// 生成小粒子
const generateParticles = (count: number): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 3,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 3,
    });
  }
  return particles;
};

// 球体动画配置
const getOrbAnimation = (id: number) => {
  const configs = {
    1: { x: [0, 70, -50, 0], y: [0, -60, 50, 0], scale: [1, 1.2, 0.9, 1], opacity: [0.3, 0.5, 0.3, 0.3], duration: 20 },
    2: { x: [0, -40, 50, 0], y: [0, 60, -50, 0], scale: [1, 0.9, 1.2, 1], opacity: [0.3, 0.4, 0.5, 0.3], duration: 25 },
    3: { x: [0, 30, -40, 0], y: [0, -50, 60, 0], scale: [1, 1.3, 0.8, 1], opacity: [0.3, 0.5, 0.3, 0.3], duration: 22 },
  };
  return configs[id as keyof typeof configs] || configs[1];
};

// 颜色调整函数
const adjustColor = (color: string, factor: number): string => {
  const rgb = color.match(/\d+/g);
  if (!rgb) return color;
  const [r, g, b] = rgb.map(n => Math.min(255, Math.round(Number(n) * factor)));
  return `rgb(${r}, ${g}, ${b})`;
};

export default function ParticleBackground() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      const isMobileDevice = window.matchMedia('(max-width: 768px)').matches || 
                             'ontouchstart' in window;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 根据设备类型选择配置
  const orbsConfig = isMobile ? orbsConfigMobile : orbsConfigDesktop;
  const particleCount = isMobile ? 5 : 10; // 移动端减少粒子数量
  const particles = useMemo(() => generateParticles(particleCount), [particleCount]);

  return (
    <div 
      className="fixed top-0 left-0 w-full overflow-hidden pointer-events-none z-0"
      style={{ height: '100dvh' }}
    >
      {/* 大型背景球体 */}
      {orbsConfig.map((orb) => {
        const anim = getOrbAnimation(orb.id);
        return (
          <motion.div
            key={`orb-${orb.id}`}
            className="absolute rounded-full blur-3xl"
            initial={{
              left: orb.initialX,
              top: orb.initialY,
              width: orb.size,
              height: orb.size,
              marginLeft: -orb.size / 2,
              marginTop: -orb.size / 2,
              opacity: anim.opacity[0],
              backgroundColor: orb.color,
            }}
            animate={{
              x: anim.x,
              y: anim.y,
              scale: anim.scale,
              opacity: anim.opacity,
              backgroundColor: [
                orb.color,
                adjustColor(orb.color, 1.2),
                adjustColor(orb.color, 0.8),
                orb.color,
              ],
            }}
            transition={{
              duration: anim.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* 小型粒子 */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-purple-500/20"
          initial={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
