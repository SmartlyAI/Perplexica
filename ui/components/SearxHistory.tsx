import { cn, formatTimeDifference } from '@/lib/utils';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import React, {
  Fragment,
  useEffect,
  useState,
  useTransition,
  type SelectHTMLAttributes,
} from 'react';
import { getUserLocale, setUserLocale } from '@/lib/services';
import { Locale } from '@/i18n/config';
import { useTranslations } from 'next-intl';
import { ClockIcon } from 'lucide-react';
import Link from 'next/link';

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  focusMode: string;
  token: string;
}

const SearxHistory = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchConfig = async () => {
        setIsLoading(true);
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/config`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // const data = (await res.json()) as SettingsType;
        // setConfig(data);

        // const chatModelProvidersKeys = Object.keys(
        //   data.chatModelProviders || {},
        // );
        // const embeddingModelProvidersKeys = Object.keys(
        //   data.embeddingModelProviders || {},
        // );

        // const defaultChatModelProvider =
        //   chatModelProvidersKeys.length > 0 ? chatModelProvidersKeys[0] : '';
        // const defaultEmbeddingModelProvider =
        //   embeddingModelProvidersKeys.length > 0
        //     ? embeddingModelProvidersKeys[0]
        //     : '';

        // const chatModelProvider =
        //   localStorage.getItem('chatModelProvider') ||
        //   defaultChatModelProvider ||
        //   '';
        // const chatModel =
        //   localStorage.getItem('chatModel') ||
        //   (data.chatModelProviders &&
        //     data.chatModelProviders[chatModelProvider]?.length > 0
        //     ? data.chatModelProviders[chatModelProvider][0].name
        //     : undefined) ||
        //   '';
        // const embeddingModelProvider =
        //   localStorage.getItem('embeddingModelProvider') ||
        //   defaultEmbeddingModelProvider ||
        //   '';
        // const embeddingModel =
        //   localStorage.getItem('embeddingModel') ||
        //   (data.embeddingModelProviders &&
        //     data.embeddingModelProviders[embeddingModelProvider]?.[0].name) ||
        //   '';

        // setSelectedChatModelProvider(chatModelProvider);
        // setSelectedChatModel(chatModel);
        // setSelectedEmbeddingModelProvider(embeddingModelProvider);
        // setSelectedEmbeddingModel(embeddingModel);
        // setCustomOpenAIApiKey(localStorage.getItem('openAIApiKey') || '');
        // setCustomOpenAIBaseURL(localStorage.getItem('openAIBaseURL') || '');
        // setChatModels(data.chatModelProviders || {});
        // setEmbeddingModels(data.embeddingModelProviders || {});
        const locale = await getUserLocale();
        setLang(locale)
        setIsLoading(false);
      };


      fetchConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  const [lang, setLang] = useState<string>('en');
  const t = useTranslations('Settings');

  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/${localStorage.getItem('token')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      setChats(data.chats);
      setFilteredChats(data.chats);
      setLoading(false);
    };

    fetchChats();
  }, []);

  const [filteredchats, setFilteredChats] = useState<Chat[]>(chats);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = chats.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredChats(filtered);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/50 dark:bg-black/50" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-200"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform rounded-2xl bg-white dark:bg-dark-secondary border border-light-200 dark:border-dark-200 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle className="text-xl font-medium leading-6 dark:text-white">
                  Search chats
                </DialogTitle>
                {!isLoading && (
                  <div className="flex flex-col space-y-4 mt-6">
                    <div className="flex flex-col space-y-1">
                      <input
                        className='bg-white dark:bg-dark-secondary px-3 py-2 overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm w-full mt-2'
                        type="text"
                        name="serach"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder='Search...'
                      />
                      {filteredchats?.length === 0 && (
                        <div className="flex flex-row items-center justify-center min-h-screen">
                          <p className="text-black/70 dark:text-white/70 text-sm">
                            {t("message")}
                          </p>
                        </div>
                      )}
                      {filteredchats?.length > 0 && (
                        <div className="flex flex-col pb-20 lg:pb-2">
                          {filteredchats.map((chat, i) => (
                            <div
                              className={cn(
                                'flex flex-col space-y-4 py-6',
                                i !== chats.length - 1
                                  ? 'border-b border-white-200 dark:border-dark-200'
                                  : '',
                              )}
                              key={i}
                            >
                              <Link
                                href={`/c/${chat.id}`}
                                className="text-black dark:text-white lg:text-xl font-medium truncate transition duration-200 hover:text-[#24A0ED] dark:hover:text-[#24A0ED] cursor-pointer"
                              >
                                {chat.title}
                              </Link>
                              <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex flex-row items-center space-x-1 lg:space-x-1.5 text-black/70 dark:text-white/70">
                                  <ClockIcon size={15} />
                                  <p className="text-xs">
                                    {formatTimeDifference(new Date(), chat.createdAt)} Ago
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearxHistory;
