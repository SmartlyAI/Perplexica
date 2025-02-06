import EmptyChatMessageInput from './EmptyChatMessageInput';
import { File } from './ChatWindow';
import { useTranslations } from 'next-intl';
import Navbar from './Navbar';

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
  const t = useTranslations('EmptyChat');

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-5 space-y-8">
        <h2 className="whitespace-nowrap text-black/70 dark:text-white/70 text-3xl font-medium -mt-8 text-center  w-full">
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
