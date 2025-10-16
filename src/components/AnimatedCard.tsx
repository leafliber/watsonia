import { motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';

interface CardProps {
  icon: string;
  title: string;
  description: string;
  url?: string;
  delay?: number;
}

export default function AnimatedCard({ icon, title, description, url, delay = 0 }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (url) {
      // 判断是否是外部链接
      if (url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        // 内部锚点链接
        const target = document.querySelector(url);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="relative z-10">
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

        <h3 className="text-2xl font-semibold mb-3 text-blue-300 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-200 leading-relaxed">
          {description}
        </p>
      </div>

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
