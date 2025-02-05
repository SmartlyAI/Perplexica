import { PanelLeftOpen, PanelRightOpen, Settings } from 'lucide-react';
import { useState } from 'react';
import useSidebarStore from '@/stores/global-stores';
import SettingsDialog from './SettingsDialog';
import ShareButton from './ShareButton';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="fixed top-0 z-40 flex justify-between p-5 items-center w-full bg-[#ffffff] dark:bg-dark-secondary">
      <PanelLeftOpen className="cursor-pointer" onClick={toggleSidebar} />

      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />

      <div className="flex items-center space-x-5">
        <ShareButton isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
        <Settings
          className="cursor-pointer"
          onClick={() => setIsSettingsOpen(true)}
        />
      </div>

    </div>
  );
};

export default Navbar;
