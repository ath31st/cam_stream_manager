import React, { useRef, useState, useEffect } from 'react';
import styles from './LimitedText.module.css';
import CommonTooltip from '../tooltips/CommonTooltip';

interface LimitedTextProps {
  text: string;
  maxLines?: number;
}

const LimitedText: React.FC<LimitedTextProps> = ({ text, maxLines = 1 }) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isTextOverflow, setIsTextOverflow] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const isOverflow =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsTextOverflow(isOverflow);
    }
  }, [text]);

  const content = (
    <p
      ref={textRef}
      className={styles.limitedText}
      style={
        {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: maxLines,
          textOverflow: 'ellipsis',
          margin: 0,
          cursor: 'pointer',
        } as React.CSSProperties
      }
    >
      {text}
    </p>
  );

  return isTextOverflow ? (
    <CommonTooltip title={text} placement="top">
      {content}
    </CommonTooltip>
  ) : (
    content
  );
};

export default LimitedText;
