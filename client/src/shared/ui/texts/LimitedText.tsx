import type React from 'react';
import { useEffect, useRef, useState } from 'react';
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
  });

  const content = (
    <p
      ref={textRef}
      style={
        {
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
