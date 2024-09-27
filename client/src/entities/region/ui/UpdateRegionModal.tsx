import React, { useState, useEffect } from 'react';
import { Modal, Input, Checkbox } from 'antd';
import { Region, UpdateRegion } from '..';

interface UpdateRegionModalProps {
  visible: boolean;
  region: Region | null;
  onOk: (updatedRegion: UpdateRegion) => void;
  onCancel: () => void;
}

const UpdateRegionModal: React.FC<UpdateRegionModalProps> = ({
  visible,
  region,
  onOk,
  onCancel,
}) => {
  const [regionName, setRegionName] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (region) {
      setRegionName(region.name);
      setIsVisible(region.isVisible);
    }
  }, [region]);

  const handleOk = () => {
    if (region) {
      onOk({ id: region.id, name: regionName, isVisible });
      setRegionName('');
      setIsVisible(true);
    }
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
      <Checkbox
        checked={isVisible}
        onChange={(e) => setIsVisible(e.target.checked)}
      >
        Видимый
      </Checkbox>
    </Modal>
  );
};

export default UpdateRegionModal;
