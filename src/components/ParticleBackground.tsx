import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// 在组件外生成粒子，避免每次渲染重新计算
const generateParticles = (): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < 10; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 1,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    });
  }
  return particles;
};

export default function ParticleBackground() {
  // 使用 useMemo 缓存粒子数据
  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-500/20"
          initial={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.2,
            scale: 1,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
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
