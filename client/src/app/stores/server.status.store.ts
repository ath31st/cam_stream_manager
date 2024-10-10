import { create } from 'zustand';
import { checkServerStatus, INTERVAL } from '../../features/server.status';

interface ServerStatusState {
  isServerUp: boolean;
  setServerStatus: (status: boolean) => void;
  startHealthCheck: () => void;
  stopHealthCheck: () => void;
}

let interval: NodeJS.Timeout | null = null;

const useServerStatusStore = create<ServerStatusState>((set) => ({
  isServerUp: true,
  setServerStatus: (status) => set({ isServerUp: status }),

  startHealthCheck: () => {
    if (interval) return;

    interval = setInterval(async () => {
      const isUp = await checkServerStatus();
      set({ isServerUp: isUp });
    }, INTERVAL);
  },

  stopHealthCheck: () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  },
}));

export default useServerStatusStore;
