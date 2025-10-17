/**
 * AnimatedCard Component
 * 
 * 可交互的卡片组件：
 * - 滚动入场动画（淡入 + 上移）
 * - 悬停时渐变背景和图标浮动效果
 * - 支持外部链接（新窗口打开）和内部锚点跳转
 * - 可配置延迟时间实现交错动画
 * 
 * @example
 * <AnimatedCard 
 *   icon="mdi:react" 
 *   title="React" 
 *   description="Web Framework"
 *   url="https://react.dev"
 *   delay={0.2}
 * />
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';

// ============================================================================
// Types
// ============================================================================

interface CardProps {
  /** Iconify 图标名称 */
  icon: string;
  
  /** 卡片标题 */
  title: string;
  
  /** 卡片描述 */
  description: string;
  
  /** 点击跳转的 URL（外部链接或内部锚点） */
  url?: string;
  
  /** 入场动画延迟（秒） */
  delay?: number;
}

// ============================================================================
// Main Component
// ============================================================================

export default function AnimatedCard({ 
  icon, 
  title, 
  description, 
  url, 
  delay = 0 
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * 处理卡片点击：
   * - 外部链接：新窗口打开
   * - 内部锚点：平滑滚动
   */
  const handleClick = () => {
    if (!url) return;

    if (url.startsWith('http')) {
      // 外部链接：新窗口打开
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // 内部锚点：平滑滚动
      const target = document.querySelector(url);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className={`glass rounded-2xl p-8 relative overflow-hidden group cursor-hover ${url ? 'cursor-pointer' : ''}`}
    >
      {/* 悬停时的渐变背景 */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* 卡片内容 */}
      <div className="relative z-10">
        {/* 图标：悬停时浮动动画 */}
        <motion.div
          className="mb-4 flex items-center justify-center w-16 h-16"
          animate={{ y: isHovered ? [-5, 0, -5] : 0 }}
          transition={{
            duration: 0.6,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <Icon 
            icon={icon} 
            className="w-full h-full text-blue-300 group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]"
          />
        </motion.div>

        {/* 标题 */}
        <h3 className="text-2xl font-semibold mb-3 text-blue-300 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>

        {/* 描述 */}
        <p className="text-gray-200 leading-relaxed">
          {description}
        </p>
      </div>

      {/* 右上角装饰：悬停时放大 */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full transition-all duration-300"
        style={{ 
          transform: isHovered ? 'scale(1.5)' : 'scale(1)',
          opacity: isHovered ? 0.3 : 0 
        }}
      />
    </motion.div>
  );
}
