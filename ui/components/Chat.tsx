'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import MessageInput from './MessageInput';
import { File, Message } from './ChatWindow';
import MessageBox from './MessageBox';
import MessageBoxLoading from './MessageBoxLoading';
import { ArchiveRestore } from 'lucide-react';
import useHistoryStore from '@/stores/history-store';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const Chat = ({
  loading,
  messages,
  sendMessage,
  messageAppeared,
  rewrite,
  fileIds,
  setFileIds,
  files,
  setFiles,
  isArchived,
  chatId
}: {
  messages: Message[];
  sendMessage: (message: string) => void;
  loading: boolean;
  messageAppeared: boolean;
  rewrite?: (messageId: string) => void;
  fileIds: string[];
  setFileIds: (fileIds: string[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  isArchived: boolean;
  chatId: string | undefined;
}) => {
  const [dividerWidth, setDividerWidth] = useState(0);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const messageEnd = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('EmptyChat');

  useEffect(() => {
    const updateDividerWidth = () => {
      if (dividerRef.current) {
        setDividerWidth(dividerRef.current.scrollWidth);
      }
    };

    updateDividerWidth();

    window.addEventListener('resize', updateDividerWidth);

    return () => {
      window.removeEventListener('resize', updateDividerWidth);
    };
  });

  // useEffect(() => {
  //   messageEnd.current?.scrollIntoView({ behavior: 'smooth' });

  //   if (messages.length === 1) {
  //     document.title = `${messages[0].content.substring(0, 30)} - Perplexica`;
  //   }
  // }, [messages]);

  const { setUpdateHistory } = useHistoryStore();

  const handleUnarchive = async (chatId: string | undefined) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}/archive`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ archived: 0 }),
        },
      );

      if (res.status != 200) {
        throw new Error('Failed to unarchive the chat');
      }
      setUpdateHistory(chatId);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col space-y-6 px-5 pt-8 pb-44 lg:pb-32 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] mx-auto">
      {messages.map((msg, i) => {
        const isLast = i === messages.length - 1;

        return (
          <Fragment key={i}>
            <MessageBox
              key={i}
              message={msg}
              messageIndex={i}
              history={messages}
              loading={loading}
              dividerRef={isLast ? dividerRef : undefined}
              isLast={isLast}
              rewrite={rewrite}
              sendMessage={sendMessage}
            />
            {!isLast && msg.role === 'assistant' && (
              <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
            )}
          </Fragment>
        );
      })}
      {loading && !messageAppeared && <MessageBoxLoading />}
      <div ref={messageEnd} className="h-0" />
      {dividerWidth > 0 && !isArchived && (
        <div
          className="pb-10 bg-[#ffffff] dark:bg-dark-primary bottom-0 fixed z-40 w-full text-center"
          style={{ width: dividerWidth }}
        >
          <MessageInput
            loading={loading}
            sendMessage={sendMessage}
            fileIds={fileIds}
            setFileIds={setFileIds}
            files={files}
            setFiles={setFiles}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t("chatWarning")}
          </p>
        </div>
      )
      }
      {isArchived && (
        <div
          className="pb-10 bg-[#ffffff] dark:bg-dark-primary bottom-0 fixed z-40 w-full"
          style={{ width: dividerWidth }}
        >
          <button
            onClick={() => handleUnarchive(chatId)}
            className='flex items-center px-4 py-3 dark:hover:bg-dark-200 bg-dark-secondary text-white rounded-full mx-auto'
          >
            <ArchiveRestore size={17} className='mr-3' />
            <span>Unarchive</span>
          </button>
        </div>
      )
      }
    </div>
  );
};

export default Chat;
