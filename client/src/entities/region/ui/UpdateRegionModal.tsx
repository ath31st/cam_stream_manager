import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { Region } from '..';

interface UpdateRegionModalProps {
  visible: boolean;
  region: Region | null;
  onOk: (updatedRegion: Partial<Region>) => void;
  onCancel: () => void;
}

const UpdateRegionModal: React.FC<UpdateRegionModalProps> = ({
  visible,
  region,
  onOk,
  onCancel,
}) => {
  const [regionName, setRegionName] = useState<string>('');

  useEffect(() => {
    if (region) {
      setRegionName(region.name);
    }
  }, [region]);

  const handleOk = () => {
    onOk({ name: regionName });
    setRegionName('');
  };

  return (
    <Modal
      title="Редактировать регион"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Input
        value={regionName}
        onChange={(e) => setRegionName(e.target.value)}
        placeholder="Название региона"
      />
    </Modal>
  );
};

export default UpdateRegionModal;
