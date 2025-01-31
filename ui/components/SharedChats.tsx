import { Share, Trash2 } from 'lucide-react';
import {
    Description,
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export interface Chat {
    id: string;
    title: string;
    createdAt: string;
    focusMode: string;
    token: string;
    shared: boolean;
}

const SharedChats = () => {
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState<Chat[]>([]);

    const fetchSharedChats = async () => {
        setLoading(true);
        try {
            let token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? '' : ''
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats/${token}/shared`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (res.status != 200) {
                throw new Error('Failed to fetch shared chats');
            }

            const data = await res.json();
            setChats(data.chats);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setConfirmationDialogOpen(false);
            setLoading(false);
        }
    };

    const deleteSharedChats = async (chatId: string) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}/share`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ shared: 0 }),
                },
            );

            if (res.status != 200) {
                throw new Error('Failed to delete shared chat');
            }
            fetchSharedChats();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setConfirmationDialogOpen(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSharedChats();
    }, []);

    return (
        <>
            <button
                onClick={() => {
                    setConfirmationDialogOpen(true);
                }}
                style={{ marginTop: 'unset' }}
                className="bg-transparent border rounded-lg p-2 mt-0 hover:bg-light-200 dark:hover:bg-dark-200"
            >
                <span>Manage</span>
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
                                        Shared chats
                                    </DialogTitle>
                                    <div className="mt-3">
                                        {chats.length === 0 ? (
                                            <p className="text-black/70 dark:text-white/70 text-sm">
                                                No shared chats
                                            </p>
                                        )
                                            : chats.map((chat, i) => (
                                                <div key={i} className="flex flex-row items-center justify-between text-black/70 dark:text-white/70 hover:bg-light-200 dark:hover:bg-dark-200 p-2 rounded-lg transition duration-200">
                                                    <Link href={`/c/${chat.id}`}>{chat.title}</Link>
                                                    <Trash2 size={17} className='cursor-pointer' onClick={() => deleteSharedChats(chat.id)} />
                                                </div>
                                            ))
                                        }

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

export default SharedChats;
