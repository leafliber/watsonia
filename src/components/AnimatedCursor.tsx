import { useEffect, useRef, useState } from 'react';

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    let rafId: number;
    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          cursorDot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
          const scale = isHovering ? 2 : 1;
          cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(${scale})`;
          rafId = 0;
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    
    // 使用事件委托代替 MutationObserver
    document.body.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, .cursor-hover')) {
        handleMouseEnter();
      }
    }, true);

    document.body.addEventListener('mouseleave', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, .cursor-hover')) {
        handleMouseLeave();
      }
    }, true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHovering]);

  return (
    <>
      {/* 圆环 - 有缩放过渡动画 */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] will-change-transform transition-transform duration-300 ease-out"
        style={{ 
          left: 0, 
          top: 0,
          transitionProperty: 'transform',
        }}
      />
      {/* 中心点 - 无过渡，立即跟随 */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
}
