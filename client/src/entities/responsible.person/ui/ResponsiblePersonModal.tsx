import React from 'react';
import { Modal, Button } from 'antd';
import { ResponsiblePerson } from '../index';

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
      title="Ответственные лица"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="ok" type="primary" onClick={onClose}>
          OK
        </Button>,
      ]}
    >
      {responsiblePersons.length > 0 ? (
        <ul>
          {responsiblePersons.map((person) => (
            <li key={person.id}>
              <p>
                Имя: {person.name} Телефон: {person.phone}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет данных об ответственных лицах</p>
      )}
    </Modal>
  );
};

export default ResponsiblePersonModal;
