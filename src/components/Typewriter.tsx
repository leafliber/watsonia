import { useEffect, useState, useRef } from 'react';

interface TypewriterProps {
  text: string | string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  loopOnce?: boolean; // 播放完一遍后停在第一句
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export default function Typewriter({
  text,
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  loop = true,
  loopOnce = false,
  showCursor = true,
  cursorCharacter = '_',
  cursorBlinkDuration = 0.5,
  className = '',
  cursorClassName = '',
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const texts = Array.isArray(text) ? text : [text];

  useEffect(() => {
    const currentText = texts[currentIndex];

    const handleTyping = () => {
      // 如果是 loopOnce 模式且已完成一遍，停留在第一句
      if (loopOnce && hasCompletedOnce && currentIndex === 0 && displayText === texts[0]) {
        return;
      }

      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          // 检查是否是最后一个文本
          const isLastText = currentIndex === texts.length - 1;
          if (loopOnce && isLastText) {
            // 播放完最后一个，标记为完成并返回第一个
            setHasCompletedOnce(true);
            setIsDeleting(true);
          } else {
            setIsDeleting(true);
          }
        }, pauseDuration);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          // Finished typing
          if (texts.length > 1 && (loop || (loopOnce && !hasCompletedOnce))) {
            setIsPaused(true);
            timeoutRef.current = setTimeout(handleTyping, pauseDuration);
          }
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Finished deleting
          setIsDeleting(false);
          const nextIndex = (currentIndex + 1) % texts.length;
          setCurrentIndex(nextIndex);
          
          // 如果 loopOnce 模式且回到第一个，开始打字第一句
          if (loopOnce && nextIndex === 0 && hasCompletedOnce) {
            // 不再继续循环
            return;
          }
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, currentIndex, isDeleting, isPaused, hasCompletedOnce, texts, typingSpeed, deletingSpeed, pauseDuration, loop, loopOnce]);

  return (
    <>
      <span className={className}>
        {displayText}
        {showCursor && (
          <span
            className={`inline-block ${cursorClassName}`}
            style={{
              animation: `blink ${cursorBlinkDuration}s infinite`,
            }}
          >
            {cursorCharacter}
          </span>
        )}
      </span>
      <style>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
