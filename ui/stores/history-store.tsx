import { create } from 'zustand';

interface HistoryState {
    updateHistory: string | undefined;
    setUpdateHistory: (newData: string | undefined) => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
    updateHistory: '',
    setUpdateHistory: (newData) => set({ updateHistory: newData }),
}));

export default useHistoryStore;