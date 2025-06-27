import { useEventStore } from '@/entities/event';
import { useGroupStore } from '@/entities/group';
import { usePlaylistStore } from '@/entities/playlist';
import { useResponsiblePersonStore } from '@/entities/responsible.person';
import { useStreamStore } from '@/entities/stream';
import { useUserStore } from '@/entities/user';

export const resetStores = () => {
  useEventStore.getState().resetStore();
  useGroupStore.getState().resetStore();
  usePlaylistStore.getState().resetStore();
  useStreamStore.getState().resetStore();
  useResponsiblePersonStore.getState().resetStore();
  useUserStore.getState().resetStore();
};
