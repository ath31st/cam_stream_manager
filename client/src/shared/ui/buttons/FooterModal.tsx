import type React from 'react';
import NarrowButton from '../../../shared/ui/buttons/NarrowButton';

interface FooterModalProps {
  onCancel: () => void;
  onOk: () => void;
  cancelText?: string;
  okText?: string;
}

const FooterModal: React.FC<FooterModalProps> = ({
  onCancel,
  onOk,
  cancelText = 'Отмена',
  okText = 'Добавить',
}) => {
  return (
    <>
      <NarrowButton key="cancel" onClick={onCancel}>
        {cancelText}
      </NarrowButton>
      <NarrowButton key="submit" onClick={onOk}>
        {okText}
      </NarrowButton>
    </>
  );
};

export default FooterModal;
