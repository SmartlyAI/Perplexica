import { ArrowRight, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import CopilotToggle from './MessageInputActions/Copilot';
import Focus from './MessageInputActions/Focus';
import Optimization from './MessageInputActions/Optimization';
import Attach from './MessageInputActions/Attach';
import { File } from './ChatWindow';
import { useTranslations } from 'next-intl';
import { isRtl } from '@/lib/utils';
import useHistoryStore from '@/stores/history-store';

const EmptyChatMessageInput = ({
  sendMessage,
  focusMode,
  setFocusMode,
  isWebSearch,
  setIsWebSearch,
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
  isWebSearch: boolean;
  setIsWebSearch: (isWebSearch: boolean) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
  fileIds: string[];
  setFileIds: (fileIds: string[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  const [copilotEnabled, setCopilotEnabled] = useState(false);
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const t = useTranslations('EmptyChat');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;

      const isInputFocused =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.hasAttribute('contenteditable');

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    inputRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  const { setUpdateHistory } = useHistoryStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setMessage(inputValue)
    setDirection(isRtl(inputValue) ? "rtl" : "ltr");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setUpdateHistory(message);
        setMessage('');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(message);
          setMessage('');
        }
      }}
      className="w-full"
    >
      <div className="flex flex-col bg-[#f4f4f4] dark:bg-dark-secondary px-5 pt-5 pb-2 rounded-lg w-full border border-light-200 dark:border-dark-200">
        <TextareaAutosize
          ref={inputRef}
          value={message}
          onChange={handleChange}
          dir={direction}
          style={{
            textAlign: direction === "rtl" ? "right" : "left",
          }}
          minRows={2}
          className="bg-transparent placeholder:text-black/50 dark:placeholder:text-white/50 text-sm text-black dark:text-white resize-none focus:outline-none w-full max-h-24 lg:max-h-36 xl:max-h-48"
          placeholder={t("placeholder")}
        />
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex flex-row items-center space-x-2 lg:space-x-4">
            {/* <div
              className={`flex items-center gap-2 border px-2 py-1 rounded-full cursor-pointer ${isWebSearch ? 'text-[#0285ff] bg-[#cde5f7] border-[#0285ff]' : 'text-black' }`}
              onClick={() => setIsWebSearch(!isWebSearch)}
            >
              <Globe size={17} />
              <span>Search</span>
            </div> */}
            {/* <Focus focusMode={focusMode} setFocusMode={setFocusMode} /> */}
            {/* <Attach
              fileIds={fileIds}
              setFileIds={setFileIds}
              files={files}
              setFiles={setFiles}
              showText
            /> */}
          </div>
          <div className="flex flex-row items-center space-x-1 sm:space-x-4">
            {/* <Optimization
              optimizationMode={optimizationMode}
              setOptimizationMode={setOptimizationMode}
            /> */}
            <button
              disabled={message.trim().length === 0}
              className="bg-[#000000] text-white disabled:text-black/50 dark:disabled:text-white/50 disabled:bg-[#e0e0dc] dark:disabled:bg-[#ececec21] hover:bg-opacity-85 transition duration-100 rounded-full p-2"
            >
              <ArrowRight className="bg-background" size={17} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmptyChatMessageInput;
