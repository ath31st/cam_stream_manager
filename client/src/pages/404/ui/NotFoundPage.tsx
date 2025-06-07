import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WideButton } from '../../../shared/ui';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.title = 'Страница не найдена';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>404</div>
      <div className={styles.subtitle}>Извините, страница не найдена.</div>
      <WideButton onClick={handleGoBack}>Вернуться назад</WideButton>
    </div>
  );
};

export default NotFoundPage;
