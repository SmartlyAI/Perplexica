import { PanelLeftOpen, PanelRightOpen, Settings } from 'lucide-react';
import { useState } from 'react';
import useSidebarStore from '@/stores/global-stores';
import SettingsDialog from './SettingsDialog';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="fixed top-0 z-40 flex justify-between p-5 items-center w-full bg-[#ffffff] dark:bg-dark-secondary">

      <PanelLeftOpen className={`cursor-pointer ${isSidebarOpen ? 'hidden' : 'block'}`} onClick={toggleSidebar} />

      <Settings
        className={`cursor-pointer ${isSidebarOpen ? 'fixed top-5 right-5' : ''}`}
        onClick={() => setIsSettingsOpen(true)}
      />

      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />

    </div>
  );
};

export default Navbar;
