import { useEffect, useRef } from 'react';

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    // 使用 RAF 优化性能
    let rafId: number;
    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          // 使用 transform 替代 left/top，性能更好
          cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
          cursorDot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
          rafId = 0;
        });
      }
    };

    const handleMouseEnter = () => {
      cursor.style.transition = 'transform 0.2s ease';
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(1.5)`;
    };

    const handleMouseLeave = () => {
      cursor.style.transition = 'transform 0.2s ease';
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(1)`;
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
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
        className="fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
}
