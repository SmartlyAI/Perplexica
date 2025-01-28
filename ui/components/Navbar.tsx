import { Clock, Edit, PanelLeftOpen, PanelRightOpen, Share, Trash } from 'lucide-react';
import { Message } from './ChatWindow';
import { useEffect, useState } from 'react';
import { formatTimeDifference } from '@/lib/utils';
import DeleteChat from './DeleteChat';
import useSidebarStore from '@/stores/global-stores';

const Navbar = ({
  chatId,
  messages,
}: {
  messages: Message[];
  chatId: string;
}) => {
  const [title, setTitle] = useState<string>('');
  const [timeAgo, setTimeAgo] = useState<string>('');
  const { toggleSidebar } = useSidebarStore();

  useEffect(() => {
    if (messages.length > 0) {
      const newTitle =
        messages[0].content.length > 20
          ? `${messages[0].content.substring(0, 20).trim()}...`
          : messages[0].content;
      setTitle(newTitle);
      const newTimeAgo = formatTimeDifference(
        new Date(),
        messages[0].createdAt,
      );
      setTimeAgo(newTimeAgo);
    }
  }, [messages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messages.length > 0) {
        const newTimeAgo = formatTimeDifference(
          new Date(),
          messages[0].createdAt,
        );
        setTimeAgo(newTimeAgo);
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className="fixed z-40 top-0 left-0 right-0 px-4 lg:pl-80 lg:pr-6 lg:px-8 flex flex-row items-center justify-between w-full py-4 text-sm text-black dark:text-white/70 border-b bg-[#efeaf3] dark:bg-dark-primary border-light-100 dark:border-dark-200">
      <a
        href="/"
        className="active:scale-95 transition duration-100 cursor-pointer lg:hidden"
      >
        <Edit size={17} />
      </a>
      <div>
        {isSidebarOpen ?
          <PanelRightOpen className="cursor-pointer" onClick={toggleSidebar} />
          :
          <PanelLeftOpen className="cursor-pointer" onClick={toggleSidebar} />
        }
      </div>
      {/* <div className="hidden lg:flex flex-row items-center justify-center space-x-2">
        <Clock size={17} />
        <p className="text-xs">{timeAgo} ago</p>
      </div> */}
      {/* <p className="hidden lg:flex">{title}</p> */}

      {/* <div className="flex flex-row items-center space-x-4">
        <DeleteChat redirect chatId={chatId} chats={[]} setChats={() => { }} />
      </div> */}
    </div>
  );
};

export default Navbar;
