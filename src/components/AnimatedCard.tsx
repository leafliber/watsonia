import { motion } from 'framer-motion';
import { useState } from 'react';

interface CardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export default function AnimatedCard({ icon, title, description, delay = 0 }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass rounded-2xl p-8 cursor-pointer relative overflow-hidden group"
    >
      {/* Hover effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <motion.div
          className="text-5xl mb-4"
          animate={{
            y: isHovered ? [-5, 0, -5] : 0,
          }}
          transition={{
            duration: 0.6,
            repeat: isHovered ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>

        <h3 className="text-2xl font-semibold mb-3 text-gradient">
          {title}
        </h3>

        <p className="text-gray-200 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner decoration */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
