import { create } from 'zustand';

interface AssistantState {
    updateAssistant: string | undefined;
    setUpdateAssistant: (newData: string | undefined) => void;
}

const useAssistantStore = create<AssistantState>((set) => ({
    updateAssistant: '6732efb8397a97154e90f583',
    setUpdateAssistant: (newData) => set({ updateAssistant: newData }),
}));

export default useAssistantStore;