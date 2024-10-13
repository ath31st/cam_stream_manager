import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Result
      title="401"
      subTitle="Извините, у вас нет доступа к этой странице."
      extra={
        <Button type="primary" onClick={handleGoBack}>
          Вернуться назад
        </Button>
      }
    />
  );
};

export default UnauthorizedPage;
