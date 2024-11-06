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
    if (INTERVAL === undefined) {
      console.warn('Health check interval is not set. Task will not start.');
      return;
    }

    if (interval) return;

    interval = setInterval(async () => {
      const isUp = await checkServerStatus();
      set((state) => {
        if (state.isServerUp !== isUp) {
          return { isServerUp: isUp };
        }
        return state;
      });
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
