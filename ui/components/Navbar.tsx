import {
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
  SquarePen,
} from 'lucide-react';
import { useState } from 'react';
import useSidebarStore from '@/stores/global-stores';
import SettingsDialog from './SettingsDialog';
import ShareButton from './ShareButton';
import { getChatId } from '@/lib/utils';
import Tooltip from './Tooltip';
import Link from 'next/link';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="fixed top-0 z-40 flex justify-between p-5 items-center w-full bg-[#ffffff] dark:bg-dark-secondary">
      <div className="flex items-center gap-4">
        <Tooltip content='open sidebar' position="right" >
          <PanelLeftOpen className={`cursor-pointer ${isSidebarOpen ? 'hidden' : 'block'}`} onClick={toggleSidebar} />
        </Tooltip>
        {!isSidebarOpen && (
          <Link href="/">
            <SquarePen />
          </Link>
        )}
      </div>

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
