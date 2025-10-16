import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    };

    const handleMouseEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    };

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousemove', moveCursor);
    
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] transition-transform duration-200"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
