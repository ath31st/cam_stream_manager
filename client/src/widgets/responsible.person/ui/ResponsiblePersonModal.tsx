import { Modal } from 'antd';
import type React from 'react';
import type { ResponsiblePerson } from '../../../shared/api.types';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import ResponsiblePersonList from './ResponsiblePersonList ';

interface ResponsiblePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  responsiblePersons: ResponsiblePerson[];
}

const ResponsiblePersonModal: React.FC<ResponsiblePersonModalProps> = ({
  isOpen,
  onClose,
  responsiblePersons,
}) => {
  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Ответственные лица</p>}
      open={isOpen}
      onCancel={onClose}
      footer={false}
    >
      <div className={styles['modal-body']}>
        {responsiblePersons.length > 0 ? (
          <ResponsiblePersonList responsiblePersons={responsiblePersons} />
        ) : (
          <p>Нет данных об ответственных лицах</p>
        )}
      </div>
    </Modal>
  );
};

export default ResponsiblePersonModal;
