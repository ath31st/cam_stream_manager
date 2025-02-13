import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { regionNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';
import { NewRegion } from '..';
import { Group } from '../../group';

interface AddRegionModalProps {
  groups: Group[];
  visible: boolean;
  onConfirm: (newRegion: NewRegion) => void;
  onCancel: () => void;
}

const AddRegionModal: React.FC<AddRegionModalProps> = ({
  groups,
  visible,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newRegion: NewRegion = {
          name: values.name,
          groupIds: values.groupIds || [],
        };
        onConfirm(newRegion);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Ошибка валидации:', info);
      });
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Создание нового региона</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={<FooterModal onCancel={onCancel} onOk={handleOk} />}
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название региона"
            rules={regionNameValidationRules}
          >
            <Input placeholder="Введите название региона" autoComplete="off" />
          </Form.Item>
          <Form.Item name="groupIds" label="Группы">
            <Select mode="multiple" placeholder="Выберите группы">
              {groups.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddRegionModal;
