import { motion, useAnimation } from 'framer-motion';
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

// 大型背景球体配置 - 桌面端（星球主题）
const orbsConfigDesktop: Orb[] = [
  { id: 1, size: 500, color: 'rgb(30, 58, 138)', initialX: '25%', initialY: '25%', delay: 0 },      // 深蓝色星球
  { id: 3, size: 800, color: 'rgb(85, 78, 203)', initialX: '50%', initialY: '50%', delay: 2.7 },   // 靛蓝色星球（提亮）
  { id: 2, size: 500, color: 'rgb(6, 110, 135)', initialX: '75%', initialY: '75%', delay: 1.3 },   // 青色星球（调暗）
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
      duration: Math.random() * 8 + 10, // 从 6 增加到 10，总时长 10-18秒
      delay: Math.random() * 5,
    });
  }
  return particles;
};

// 球体动画配置（闪烁效果）
const getOrbAnimation = (id: number) => {
  const configs = {
    1: { opacity: [0.25, 0.75, 0.25, 0.25], duration: 18 },
    2: { opacity: [0.2, 0.7, 0.3, 0.2], duration: 20 },
    3: { opacity: [0.25, 0.7, 0.25, 0.25], duration: 16 },
  };
  return configs[id as keyof typeof configs] || configs[1];
};

export default function ParticleBackground() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const maskControls = useAnimation();
  const orb1Controls = useAnimation();
  const orb2Controls = useAnimation();
  const orb3Controls = useAnimation();
  
  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 移动端遮罩入场动画与后续循环控制
  useEffect(() => {
    if (!isMobile) return;

    let mounted = true;

    // 先快速入场（淡入 + 放大），然后进入循环呼吸
    (async () => {
      await maskControls.start({ opacity: 0, transition: { duration: 0 } });
      if (!mounted) return;
      await maskControls.start({ opacity: 0.70, transition: { duration: 0.6, ease: 'easeOut' } });
      if (!mounted) return;
      // 切换到循环呼吸动画
      maskControls.start({ opacity: [0.70, 1, 0.70], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } });
    })();

    return () => { mounted = false; };
  }, [isMobile, maskControls]);

  // 桌面端球体入场动画
  useEffect(() => {
    if (isMobile !== false) return;

    const animateOrb = async (controls: any, orbId: number) => {
      const anim = getOrbAnimation(orbId);
      // 入场动画：淡入 + 放大
      await controls.start({
        opacity: anim.opacity[0],
        scale: 1,
        transition: { duration: 1.2, ease: 'easeOut' }
      });
      // 切换到循环闪烁
      controls.start({
        opacity: anim.opacity,
        transition: { duration: anim.duration, repeat: Infinity, ease: 'easeInOut' }
      });
    };

    // 依次启动各球体入场（带延迟）
    setTimeout(() => animateOrb(orb1Controls, 1), 2700);
    setTimeout(() => animateOrb(orb3Controls, 3), 0);
    setTimeout(() => animateOrb(orb2Controls, 2), 1300);
  }, [isMobile, orb1Controls, orb2Controls, orb3Controls]);

  // 根据设备类型选择配置
  const orbsConfig = orbsConfigDesktop;
  const particleCount = isMobile ? 5 : 10; // 移动端减少粒子数量
  const particles = useMemo(() => generateParticles(particleCount), [particleCount]);

  // 如果还没检测到设备类型，不渲染任何内容避免闪烁
  if (isMobile === null) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 w-full overflow-hidden pointer-events-none z-0"
      style={{ height: '100dvh' }}
    >
      {/* 移动端背景遮罩 */}
      {isMobile && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(75, 68, 203, 0.8) 0%, rgba(50, 88, 168, 0.65) 35%, rgba(28, 175, 208, 0.5) 60%, transparent 90%)',
            }}
            initial={{ opacity: 0 }}
            animate={maskControls}
          />
        </div>
      )}

      {/* 大型背景球体 - 仅在桌面端显示（优化版：固定位置，仅闪烁） */}
      {!isMobile && orbsConfig.map((orb) => {
        const controls = orb.id === 1 ? orb1Controls : orb.id === 2 ? orb2Controls : orb3Controls;
        return (
          <motion.div
            key={`orb-${orb.id}`}
            className="absolute rounded-full blur-3xl"
            style={{
              left: orb.initialX,
              top: orb.initialY,
              width: orb.size,
              height: orb.size,
              marginLeft: -orb.size / 2,
              marginTop: -orb.size / 2,
              backgroundColor: orb.color,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
          />
        );
      })}

      {/* 小型粒子（星星效果） */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-cyan-400/30"
          style={{
            boxShadow: '0 0 8px rgba(6, 182, 212, 0.6)',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: [0, 1, 0, 0, 1, 0],
            scale: [0.8, 1.5, 0.8, 0.8, 1.5, 0.8],
            x: [0, 0, 0, Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20],
            y: [0, 0, 0, Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.2, 0.4, 0.5, 0.7, 0.9],
          }}
        />
      ))}
    </div>
  );
}
