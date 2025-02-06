import { PanelLeftOpen, PanelRightOpen, Settings } from 'lucide-react';
import { useState } from 'react';
import useSidebarStore from '@/stores/global-stores';
import SettingsDialog from './SettingsDialog';
import ShareButton from './ShareButton';
import { getChatId } from '@/lib/utils';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="fixed top-0 z-40 flex justify-between p-5 items-center w-full bg-[#ffffff] dark:bg-dark-secondary">

      <PanelLeftOpen className={`cursor-pointer ${isSidebarOpen ? 'hidden' : 'block'}`} onClick={toggleSidebar} />

      <div
        className={`flex items-center ${isSidebarOpen ? 'fixed top-5 right-5' : ''}`}
      >
        {getChatId() && (
          <ShareButton isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
        )}
        <Settings
          className="cursor-pointer"
          onClick={() => setIsSettingsOpen(true)}
        />
      </div>

      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />

    </div >
  );
};

export default Navbar;
