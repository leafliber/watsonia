/**
 * AnimatedCursor Component
 * 
 * 自定义光标效果（仅桌面端）：
 * - 跟随鼠标的圆点和圆环
 * - 悬停在链接/按钮时放大效果
 * - 使用 requestAnimationFrame 优化性能
 * - 移动设备自动禁用
 */

import { useEffect, useRef, useState } from 'react';

// ============================================================================
// Main Component
// ============================================================================

export default function AnimatedCursor() {
  // DOM 引用
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  // 状态管理
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * 移动设备检测
   */
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches || 
                     'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  /**
   * 光标跟随和交互效果
   */
  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    // 光标位置状态
    let rafId: number;
    let currentX = 0;
    let currentY = 0;

    /**
     * 鼠标移动处理：使用 RAF 优化性能
     */
    const moveCursor = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          // 圆点：立即跟随
          cursorDot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
          
          // 圆环：跟随 + 缩放
          const scale = isHovering ? 2 : 1;
          cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(${scale})`;
          
          rafId = 0;
        });
      }
    };

    /**
     * 悬停状态处理：使用事件委托
     */
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // 鼠标移动监听
    window.addEventListener('mousemove', moveCursor, { passive: true });
    
    // 悬停检测：使用事件委托提升性能
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

    // 清理函数
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHovering, isMobile]);

  // 移动设备不渲染自定义光标
  if (isMobile) return null;

  return (
    <>
      {/* 光标圆环：有缩放过渡效果 */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] will-change-transform transition-transform duration-300 ease-out hidden md:block"
        style={{ 
          left: 0, 
          top: 0,
          transitionProperty: 'transform',
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
        }}
      />
      
      {/* 光标圆点：立即跟随，无过渡 */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] will-change-transform hidden md:block"
        style={{ 
          left: 0, 
          top: 0,
          boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)',
        }}
      />
    </>
  );
}
