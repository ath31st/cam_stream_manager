import React, { useEffect } from 'react';
import { Modal, Input, Form, Switch, Select } from 'antd';
import { Region, UpdateRegion } from '..';
import { regionNameValidationRules } from '../../../shared/validations';
import styles from '../../../shared/styles/CommonModalStyle.module.css';
import FooterModal from '../../../shared/ui/buttons/FooterModal';
import { Group } from '../../group';

interface UpdateRegionModalProps {
  groups: Group[];
  visible: boolean;
  region: Region | null;
  onConfirm: (updatedRegion: UpdateRegion) => void;
  onCancel: () => void;
}

const UpdateRegionModal: React.FC<UpdateRegionModalProps> = ({
  groups,
  visible,
  region,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (region) {
      form.setFieldsValue({
        ...region,
        groupIds: region.groupIds || [],
      });
    }
  }, [region, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedRegion: UpdateRegion = {
        id: region!.id,
        name: values.name,
        isVisible: values.isVisible,
        groupIds: values.groupIds || [],
      };
      onConfirm(updatedRegion);
    });
  };

  return (
    <Modal
      className={styles.modal}
      title={<p className={styles['modal-title']}>Редактирование региона</p>}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={
        <FooterModal onCancel={onCancel} onOk={handleOk} okText="Сохранить" />
      }
    >
      <div className={styles['modal-body']}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Название региона"
            rules={regionNameValidationRules}
          >
            <Input placeholder="Введите новое название региона" />
          </Form.Item>
          <Form.Item
            name="isVisible"
            label="Видимость в списке плеера"
            valuePropName="checked"
          >
            <Switch checkedChildren="Виден" unCheckedChildren="Скрыт" />
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

export default UpdateRegionModal;
