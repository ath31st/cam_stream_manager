import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WideButton } from '../../../shared/ui';
import styles from '../../../shared/styles/Common40XPageStyle.module.css';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.title = 'Доступ запрещен';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>401</div>
      <div className={styles.subtitle}>
        Извините, у вас нет доступа к этой странице.
      </div>
      <WideButton onClick={handleGoBack}>Вернуться назад</WideButton>
    </div>
  );
};

export default UnauthorizedPage;
