/**
 * Typewriter Component
 * 
 * 打字机效果组件：
 * - 支持多个单词循环显示
 * - 可配置打字/删除速度、停顿时长
 * - 支持单次循环模式（loopOnce）
 * - 带有可配置的闪烁光标
 * 
 * @example
 * <Typewriter 
 *   words={['Hello', 'World']} 
 *   typingSpeed={100}
 *   deletingSpeed={50}
 *   pauseDuration={2000}
 *   loopOnce={true}
 * />
 */

import { useState, useEffect, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

interface TypewriterProps {
  /** 要显示的单词数组 */
  words: string[];
  
  /** 打字速度（毫秒/字符） */
  typingSpeed?: number;
  
  /** 删除速度（毫秒/字符） */
  deletingSpeed?: number;
  
  /** 打完单词后的停顿时间（毫秒） */
  pauseDuration?: number;
  
  /** 删除完单词后的停顿时间（毫秒，默认使用 pauseDuration） */
  deletePauseDuration?: number;
  
  /** 光标字符 */
  cursorChar?: string;
  
  /** 光标闪烁速度（毫秒） */
  cursorBlinkSpeed?: number;
  
  /** 自定义 CSS 类名 */
  className?: string;
  
  /** 完成回调函数 */
  onComplete?: () => void;
  
  /** 是否只循环一次后停在第一个单词 */
  loopOnce?: boolean;
}

// ============================================================================
// Main Component
// ============================================================================

export default function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  deletePauseDuration,
  cursorChar = '|',
  cursorBlinkSpeed = 500,
  className = '',
  onComplete,
  loopOnce = false,
}: TypewriterProps) {
  // 状态管理
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [shouldStop, setShouldStop] = useState(false);
  
  // 定时器引用
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cursorIntervalRef = useRef<NodeJS.Timeout>();

  // 删除后停顿时间
  const deletePause = deletePauseDuration ?? pauseDuration;

  /**
   * 主打字机逻辑
   * 状态机：打字 → 停顿 → 删除 → 停顿 → 下一个单词
   */
  useEffect(() => {
    // 如果已停止且文字已显示完整，直接返回
    if (shouldStop && displayText === words[0]) {
      return;
    }

    const currentWord = words[wordIndex];
    
    // 正在打字
    if (!isDeleting && displayText.length < currentWord.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }, typingSpeed);
    }
    // 打字完成，准备删除
    else if (!isDeleting && displayText.length === currentWord.length) {
      // 如果是停止状态，不要删除，保持显示
      if (shouldStop) {
        return;
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }
    // 正在删除
    else if (isDeleting && displayText.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingSpeed);
    }
    // 删除完成，切换到下一个单词
    else if (isDeleting && displayText.length === 0) {
      const nextIndex = (wordIndex + 1) % words.length;
      
      // loopOnce 模式：完成一轮后停止并打字显示第一个单词
      if (loopOnce && nextIndex === 0 && wordIndex === words.length - 1) {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex(0);
          setShouldStop(true);
          if (onComplete) onComplete();
        }, deletePause);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex(nextIndex);
        }, deletePause);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    wordIndex,
    isDeleting,
    shouldStop,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    deletePause,
    loopOnce,
    onComplete,
  ]);

  /**
   * 光标闪烁效果
   */
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [cursorBlinkSpeed]);

  return (
    <span className={className}>
      {displayText}
      <span
        className="inline-block"
        style={{
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      >
        {cursorChar}
      </span>
    </span>
  );
}
