/**
 * ParticleBackground Component
 * 
 * 提供响应式背景效果组件：
 * - 桌面端：3个大型背景球体（闪烁动画）+ 小型粒子星星
 * - 移动端：圆形渐变遮罩（呼吸动画）+ 小型粒子星星
 * 
 * 性能优化：
 * - 移动端减少粒子数量
 * - 使用固定位置避免重排
 * - 优化动画使用 will-change
 */

import { motion, useAnimation } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Constants
// ============================================================================

/**
 * 桌面端大型背景球体配置
 * 星球主题：深蓝、靛蓝、青色
 */
const DESKTOP_ORBS: Orb[] = [
  { 
    id: 1, 
    size: 500, 
    color: 'rgb(30, 58, 138)', 
    initialX: '25%', 
    initialY: '25%', 
    delay: 0 
  },
  { 
    id: 3, 
    size: 800, 
    color: 'rgb(85, 78, 203)', 
    initialX: '50%', 
    initialY: '50%', 
    delay: 2.7 
  },
  { 
    id: 2, 
    size: 500, 
    color: 'rgb(6, 110, 135)', 
    initialX: '75%', 
    initialY: '75%', 
    delay: 1.3 
  },
];

/**
 * 球体闪烁动画配置
 * 不同球体有不同的透明度变化和时长
 */
const ORB_ANIMATIONS = {
  1: { opacity: [0.25, 0.75, 0.25, 0.25], duration: 18 },
  2: { opacity: [0.2, 0.7, 0.3, 0.2], duration: 20 },
  3: { opacity: [0.25, 0.7, 0.25, 0.25], duration: 16 },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * 生成随机分布的粒子数组
 * @param count - 粒子数量
 * @returns 粒子配置数组
 */
const generateParticles = (count: number): Particle[] => {
  const particles: Particle[] = [];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 3,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 5,
    });
  }
  
  return particles;
};

/**
 * 获取指定球体的动画配置
 * @param id - 球体ID
 * @returns 动画配置对象
 */
const getOrbAnimation = (id: number) => {
  return ORB_ANIMATIONS[id as keyof typeof ORB_ANIMATIONS] || ORB_ANIMATIONS[1];
};

// ============================================================================
// Main Component
// ============================================================================

export default function ParticleBackground() {
  // 状态管理
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  
  // 动画控制器
  const maskControls = useAnimation();
  const orb1Controls = useAnimation();
  const orb2Controls = useAnimation();
  const orb3Controls = useAnimation();
  
  // 检测设备类型
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 移动端遮罩动画：入场 → 呼吸循环
  useEffect(() => {
    if (!isMobile) return;

    let mounted = true;

    (async () => {
      // 初始化为透明
      await maskControls.start({ 
        opacity: 0, 
        transition: { duration: 0 } 
      });
      
      if (!mounted) return;
      
      // 淡入
      await maskControls.start({ 
        opacity: 0.70, 
        transition: { duration: 0.6, ease: 'easeOut' } 
      });
      
      if (!mounted) return;
      
      // 开始呼吸循环
      maskControls.start({ 
        opacity: [0.70, 1, 0.70], 
        transition: { 
          duration: 6, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        } 
      });
    })();

    return () => { 
      mounted = false; 
    };
  }, [isMobile, maskControls]);

  // 桌面端球体动画：入场 → 闪烁循环
  useEffect(() => {
    if (isMobile !== false) return;

    /**
     * 执行单个球体的入场和循环动画
     */
    const animateOrb = async (controls: any, orbId: number) => {
      const anim = getOrbAnimation(orbId);
      
      // 入场：淡入 + 放大
      await controls.start({
        opacity: anim.opacity[0],
        scale: 1,
        transition: { duration: 1.2, ease: 'easeOut' }
      });
      
      // 循环：闪烁效果
      controls.start({
        opacity: anim.opacity,
        transition: { 
          duration: anim.duration, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }
      });
    };

    // 依次启动各球体（按配置的延迟时间）
    setTimeout(() => animateOrb(orb1Controls, 1), 2700);
    setTimeout(() => animateOrb(orb3Controls, 3), 0);
    setTimeout(() => animateOrb(orb2Controls, 2), 1300);
  }, [isMobile, orb1Controls, orb2Controls, orb3Controls]);

  // 生成粒子配置
  const particleCount = isMobile ? 5 : 10;
  const particles = useMemo(
    () => generateParticles(particleCount), 
    [particleCount]
  );

  // 设备类型未确定时不渲染，避免闪烁
  if (isMobile === null) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 w-full overflow-hidden pointer-events-none z-0"
      style={{ height: '100dvh' }}
    >
      {/* 移动端：圆形渐变遮罩 */}
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

      {/* 桌面端：大型背景球体 */}
      {!isMobile && DESKTOP_ORBS.map((orb) => {
        const controls = orb.id === 1 ? orb1Controls 
                       : orb.id === 2 ? orb2Controls 
                       : orb3Controls;
        
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

      {/* 小型粒子：星星效果 */}
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
