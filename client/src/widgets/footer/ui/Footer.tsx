import type React from 'react';
import styles from './Footer.module.css';

export const AppFooter: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={'container'}>
        <div className={'cont'}>
          <div className={styles.footer_center}>
            <h3>Спасибо, что пользуетесь нашим сервисом!</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
