import React, { useState } from 'react';
import { RegionInfo } from '../../../entities/dashboard';
import { useResponsiblePersonStore } from '../../../app/stores/responsiblePersonStore';
import { ResponsiblePersonModal } from '../../../entities/responsible.person';

const RegionCard: React.FC<RegionInfo> = ({
  regionName,
  streams,
  activeCount,
  noConnectionCount,
  badConnectionCount,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { fetchResponsiblePersonsByStream, responsiblePersons } =
    useResponsiblePersonStore();

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const openModal = async (streamId: number) => {
    fetchResponsiblePersonsByStream(streamId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="region-card">
      <h3 onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {regionName} ({activeCount} активных, {noConnectionCount} без
        соединения, {badConnectionCount} с плохим соединением)
      </h3>
      {isOpen && (
        <ul>
          {streams.map((stream) => (
            <li
              key={stream.id}
              style={{ cursor: 'pointer' }}
              onClick={() => openModal(stream.id)}
            >
              {stream.location}: {stream.status}
            </li>
          ))}
        </ul>
      )}

      <ResponsiblePersonModal
        onClose={closeModal}
        isOpen={isModalVisible}
        responsiblePersons={responsiblePersons}
      />
    </div>
  );
};

export default RegionCard;
