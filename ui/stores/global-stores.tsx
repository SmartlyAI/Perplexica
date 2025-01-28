import { isXsM } from '@/lib/utils';
import { create } from 'zustand';

interface SidebarState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
    isSidebarOpen: !isXsM(),
    toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSidebarStore;
