import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Link, X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { getChatId } from '@/lib/utils';


const ShareDialog = ({
  chatId = null,
  isOpen,
  setIsOpen,
}: {
  chatId?: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [shareUrl, setShareUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const createLink = async () => {
    if (chatId === null) {
      chatId = getChatId();
    }

    if (!chatId) {
      setError('Invalid chat ID');
      toast.error('Invalid chat ID');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}/share`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shared: 1 }),
        },
      );

      if (!res.ok) {
        throw new Error('Failed to share chat');
      }

      setShareUrl(window.location.href);

      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');

    } catch (error) {
      setError('Failed to create share link');
      toast.error('Failed to create share link');
      console.error('Error creating share link:', error);
    } finally {
      setIsLoading(false);
    }
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
              <DialogPanel className="w-full max-w-md transform rounded-2xl bg-white dark:bg-dark-secondary border border-light-200 dark:border-dark-200 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-xl font-medium leading-6 dark:text-white">
                    Share public link to chat
                  </DialogTitle>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <hr className="my-4 border-gray-200 dark:border-dark-200" />
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your name, custom instructions, and any messages you add
                    after sharing stay private.
                  </p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={shareUrl || window.location.href}
                      readOnly
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                    <button
                      onClick={createLink}
                      disabled={isLoading}
                      className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Link className="h-6 w-6" />
                      {isLoading ? 'Creating...' : 'Create link'}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareDialog;
