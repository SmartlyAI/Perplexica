import { Share } from 'lucide-react';
import {
    Description,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

const ShareChat = ({
    chatId,
}: {
    chatId: string;
}) => {
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        setLoading(true);
        try {
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

            if (res.status != 200) {
                throw new Error('Failed to share chat');
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setConfirmationDialogOpen(false);
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => {
                    setConfirmationDialogOpen(true);
                }}
                className="bg-transparent flex items-center px-4 py-3 hover:bg-light-200 dark:hover:bg-dark-200"
            >
                <Share size={17} className='mr-3' />
                <span>Share</span>
            </button>
            <Transition appear show={confirmationDialogOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => {
                        if (!loading) {
                            setConfirmationDialogOpen(false);
                        }
                    }}
                >
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
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
                                    <DialogTitle className="text-lg font-medium leading-6 dark:text-white">
                                        Share Chat
                                    </DialogTitle>
                                    <Description className="text-sm dark:text-white/70 text-black/70">
                                        Your name, custom instructions, and any messages you add after sharing will be visible to anyone with the link.
                                    </Description>
                                    <div className="flex flex-row items-end justify-end space-x-4 mt-6">
                                        <button
                                            onClick={() => {
                                                if (!loading) {
                                                    setConfirmationDialogOpen(false);
                                                }
                                            }}
                                            className="text-black/50 dark:text-white/50 text-sm hover:text-black/70 hover:dark:text-white/70 transition duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="text-sm transition duration200"
                                        >
                                            Share
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ShareChat;
