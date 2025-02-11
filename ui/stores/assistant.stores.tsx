import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Assistant {
    id: string;
    name: string;
}

interface AssistantState {
    updateAssistant: Assistant | undefined;
    setUpdateAssistant: (newData: Assistant | undefined) => void;
}

const useAssistantStore = create<AssistantState>()(
    persist(
        (set) => ({
            updateAssistant: { id: '6732efb8397a97154e90f583', name: 'SGMA' },
            setUpdateAssistant: (newData) => set({ updateAssistant: newData }),
        }),
        {
            name: 'assistant',
        }
    ));

export default useAssistantStore;