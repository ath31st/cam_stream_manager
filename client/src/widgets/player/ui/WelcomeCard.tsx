import React from 'react';
import { Card } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './WelcomeCard.module.css';

const WelcomeCard: React.FC = () => (
  <Card className={styles['welcome-card']}>
    <InfoCircleOutlined className={styles['icon']} />
    <h2>Добро пожаловать!</h2>
    <p>Выберите поток из списка регионов для начала просмотра.</p>
    <p>Если поток недоступен, обратитесь к ответственным лицам.</p>
  </Card>
);

export default WelcomeCard;
