import {
  ChevronDown,
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
import useAssistantStore from '@/stores/assistant.stores';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const t = useTranslations('Sidebar');

  const { updateAssistant } = useAssistantStore();
  return (
    <div className="fixed top-0 z-40 flex justify-between p-5 items-center w-full bg-[#ffffff] dark:bg-dark-secondary">
      <div className="flex items-center gap-4">
        <Tooltip content={t('openSidebar')} position="right" >
          <PanelLeftOpen className={`cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-600/20 transition-colors ${isSidebarOpen ? 'hidden' : 'block'}`} onClick={toggleSidebar} />
        </Tooltip>
        {!isSidebarOpen && (
            <Link href="/">
              <SquarePen />
            </Link>
        )}
        <button className='flex items-center gap-2 px-3 py-2 hover:bg-gray-50'>
          <h1>{updateAssistant?.name}</h1>
          <ChevronDown />
        </button>
      </div>

      <div
        className={`flex items-center ${isSidebarOpen ? 'fixed top-5 right-5' : ''}`}
      >
        {getChatId() && (
          <ShareButton isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
        )}
        <Settings
          className="cursor-pointer hover:bg-gray-200/30 dark:hover:bg-gray-600/20 transition-colors"
          onClick={() => setIsSettingsOpen(true)}
        />
      </div>

      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />

    </div >
  );
};

export default Navbar;
