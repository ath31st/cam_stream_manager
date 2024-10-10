import { create } from 'zustand';

interface ServerStatusState {
  isServerUp: boolean;
  setServerStatus: (status: boolean) => void;
}

const useServerStatusStore = create<ServerStatusState>((set) => ({
  isServerUp: true,
  setServerStatus: (status) => set({ isServerUp: status }),
}));

export default useServerStatusStore;
