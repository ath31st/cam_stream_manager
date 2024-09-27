import React from 'react';
import { Modal } from 'antd';

interface AddRegionModalProps {
  visible: boolean;
  onOk: (name: string) => void;
  onCancel: () => void;
}

const AddRegionModal: React.FC<AddRegionModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  const [newRegionName, setNewRegionName] = React.useState<string>('');

  const handleOk = () => {
    if (newRegionName) {
      onOk(newRegionName);
      setNewRegionName('');
    }
  };

  return (
    <Modal
      title="Добавить новый регион"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <p>Введите название региона:</p>
      <input
        value={newRegionName}
        onChange={(e) => setNewRegionName(e.target.value)}
        placeholder="Название региона"
      />
    </Modal>
  );
};

export default AddRegionModal;
