import { PanelLeftOpen, PanelRightOpen, Settings } from 'lucide-react';
import EmptyChatMessageInput from './EmptyChatMessageInput';
import SettingsDialog from './SettingsDialog';
import { useState } from 'react';
import { File } from './ChatWindow';
import { useTranslations } from 'next-intl';
import useSidebarStore from '@/stores/global-stores';

const EmptyChat = ({
  sendMessage,
  focusMode,
  setFocusMode,
  optimizationMode,
  setOptimizationMode,
  fileIds,
  setFileIds,
  files,
  setFiles,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
  fileIds: string[];
  setFileIds: (fileIds: string[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const t = useTranslations('EmptyChat');
  const { toggleSidebar } = useSidebarStore();
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className="relative">
      <div className="absolute flex flex-row items-center ml-5 mt-5 left-0">
        {isSidebarOpen ?
          <PanelRightOpen className="cursor-pointer" onClick={toggleSidebar} />
          :
          <PanelLeftOpen className="cursor-pointer" onClick={toggleSidebar} />
        }
      </div>
      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
      <div className="absolute flex flex-row items-center justify-end mr-5 mt-5 right-0">
        <Settings
          className="cursor-pointer"
          onClick={() => setIsSettingsOpen(true)}
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-2 space-y-8">
        <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
          {t("title")}
        </h2>
        <EmptyChatMessageInput
          sendMessage={sendMessage}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          optimizationMode={optimizationMode}
          setOptimizationMode={setOptimizationMode}
          fileIds={fileIds}
          setFileIds={setFileIds}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </div>
  );
};

export default EmptyChat;
