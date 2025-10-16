import { useEffect, useRef, useState } from 'react';

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

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
          // 中心点立即跟随，无过渡
          cursorDot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
          
          // 圆环也跟随位置，但保持当前的 scale
          const scale = isHovering ? 2 : 1;
          cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(${scale})`;
          
          rafId = 0;
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    
    // 使用 MutationObserver 来检测动态添加的元素
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, .cursor-hover');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    // 初始化交互元素 - 包括带 cursor-hover 类的元素
    const interactiveElements = document.querySelectorAll('a, button, .cursor-hover');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // 监听 DOM 变化
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      const elements = document.querySelectorAll('a, button, .cursor-hover');
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
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
