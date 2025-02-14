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
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const t = useTranslations('Sidebar');

  return (
    <div className="fixed top-0 z-40 flex justify-between p-5 items-center w-full bg-[#ffffff] dark:bg-dark-secondary">
      <div className="flex items-center gap-4">
        <Tooltip content={t('openSidebar')} position="right" >
        <div
        className="cursor-pointer text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg"
        onClick={toggleSidebar}
        >
            <PanelLeftOpen className={`${isSidebarOpen ? 'hidden' : 'block'}`} />
        </div>
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
        <div
          className='cursor-pointer text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg'
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings />  
        </div> 
      </div>

      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />

    </div >
  );
};

export default Navbar;
