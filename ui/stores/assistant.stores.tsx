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
            updateAssistant: { id: '67b381bf96489a7875a9688d', name: 'Smartly Chat' },
            setUpdateAssistant: (newData) => set({ updateAssistant: newData }),
        }),
        {
            name: 'assistant',
        }
    ));

export default useAssistantStore;