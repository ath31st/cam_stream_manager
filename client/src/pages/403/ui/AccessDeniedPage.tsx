import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WideButton } from '../../../shared/ui';
import styles from './AccessDeniedPage.module.css';

const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.title = 'Доступ запрещен';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>403</div>
      <div className={styles.subtitle}>
        Извините, у вас нет прав для доступа к этой странице.
      </div>
      <WideButton onClick={handleGoBack}>Вернуться назад</WideButton>
    </div>
  );
};

export default AccessDeniedPage;
