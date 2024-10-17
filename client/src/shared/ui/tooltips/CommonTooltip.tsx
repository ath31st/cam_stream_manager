import React from 'react';
import { Tooltip } from 'antd';
import styles from './CommonTooltip.module.css';

interface CommonTooltipProps {
  title: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

const CommonTooltip: React.FC<CommonTooltipProps> = ({
  title,
  placement = 'top',
  children,
}) => {
  return (
    <Tooltip
      overlayInnerStyle={{
        background: 'none',
        border: 'none',
        boxShadow: 'none',
      }}
      title={<div className={styles.tooltip}>{title}</div>}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};

export default CommonTooltip;
