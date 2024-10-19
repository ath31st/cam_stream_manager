import React from 'react';
import { Modal } from 'antd';
import { ResponsiblePerson } from '../index';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import listStyles from './ResponsiblePersonModalStyle.module.css';

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
          <ul className={listStyles.list}>
            {responsiblePersons.map((person) => (
              <li key={person.id} className={listStyles['list-item']}>
                <p className={listStyles['person-name']}>Имя: {person.name}</p>
                <p className={listStyles['person-phone']}>
                  Телефон: {person.phone}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных об ответственных лицах</p>
        )}
      </div>
    </Modal>
  );
};

export default ResponsiblePersonModal;
