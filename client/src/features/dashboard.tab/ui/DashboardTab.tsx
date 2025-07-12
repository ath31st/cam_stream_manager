import { Col, Row } from 'antd';
import type React from 'react';
import { LargeLoader } from '@/shared/ui';
import PlaylistCard from './PlaylistCard';
import EventSidebar from './EventSidebar';
import useDashboardTabHandlers from '../model/use.dahsboard.tab.handlers';

interface DashboardProps {
  isActiveTab: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isActiveTab }) => {
  const { actions, state } = useDashboardTabHandlers(isActiveTab);

  return (
    <Row gutter={16}>
      <Col span={18}>
        {state.isLoading ? (
          <LargeLoader />
        ) : (
          <Row gutter={[16, 22]}>
            {state.dashboardData
              .sort(actions.sortPlaylistsByName)
              .map((playlist) => (
                <Col key={playlist.playlistName} xs={24} sm={12} lg={8}>
                  <PlaylistCard
                    {...playlist}
                    isOpen={state.openPlaylist === playlist.playlistName}
                    onToggle={actions.togglePlaylist}
                  />
                </Col>
              ))}
          </Row>
        )}
      </Col>
      <Col span={6}>
        <EventSidebar isActiveTab={isActiveTab} />
      </Col>
    </Row>
  );
};

export default Dashboard;
