import { create } from 'zustand';

interface HistoryState {
    updateHistory: string;
    setUpdateHistory: (newData: string) => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
    updateHistory: '',
    setUpdateHistory: (newData) => set({ updateHistory: newData }),
}));

export default useHistoryStore;