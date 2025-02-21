import {
  ChevronDown,
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
  SquarePen,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import useSidebarStore from '@/stores/global-stores';
import SettingsDialog from './SettingsDialog';
import ShareButton from './ShareButton';
import { getChatId } from '@/lib/utils';
import Tooltip from './Tooltip';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import useAssistantStore from '@/stores/assistant.stores';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const t = useTranslations('Sidebar');

  const { updateAssistant, setUpdateAssistant } = useAssistantStore();
  const [skills, setSkills] = useState<any>();
  const [loading, setLoading] = useState(true);
  const Router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://bots.smartly.ai/apis/builder/api/skills`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(process.env.NEXT_PUBLIC_USER_TOKEN && { Authorization: process.env.NEXT_PUBLIC_USER_TOKEN }),
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        console.log(data.skills);

        // data.blogs = data.blogs.filter((blog: Discover) => blog.thumbnail);

        setSkills(data.skills);
      } catch (err: any) {
        console.error('Error fetching data:', err.message);
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="fixed top-0 z-40 flex justify-between p-5 items-center w-full bg-[#ffffff] dark:bg-dark-secondary">
      <div className="flex items-center">
        <div
          className={`flex cursor-pointer text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg ${isSidebarOpen ? 'hidden' : 'block'}`}
          onClick={toggleSidebar}
        >
          <Tooltip content={t('openSidebar')} position="right">
            <PanelLeftOpen />
          </Tooltip>
        </div>
        {!isSidebarOpen && (
          <Link href="/" className="flex text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg ">
            {/* <div className="cursor-pointer text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg "> */}
               <Tooltip content={t("newChat")} position="bottom">
                   <SquarePen />
               </Tooltip>
            {/* </div> */}
          </Link>
        )}

        <Popover className="relative">
        {({ close }) => (
            <>
              <PopoverButton className="">
                <button className='flex items-center gap-2 px-3 py-2 hover:bg-gray-50'>
                  <h1>{updateAssistant?.name}</h1>
                  <ChevronDown />
                </button>
              </PopoverButton>
              <PopoverPanel
                anchor="bottom start"
                className="flex flex-col z-[50] border-2 bg-white dark:bg-dark-secondary rounded-lg shadow-lg w-[300px] h-[500px]"
                onClick={(e) => e.stopPropagation()}
              >
                {skills &&
                skills?.map((item: any, i: any) => (
                  <div
                    key={item._id}
                    className="flex-1 cursor-pointer p-2 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={(e) => {
                      setUpdateAssistant(
                        item._id && item.name ? { id: item._id, name: item.name } : undefined,
                      );
                      e.stopPropagation();
                      Router.push('/');
                      close(); 
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </PopoverPanel>
            </>
          )}
        </Popover>
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
