import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

const ExportData = ({
    token,
}: {
    token: string;
}) => {
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleExportData = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats/${token}/download`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (res.status != 200) {
                throw new Error('Failed to download chats');
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `chats_${token}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
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
                style={{ marginTop: 'unset' }}
                className="bg-transparent border rounded-lg p-2 mt-0 hover:bg-light-200 dark:hover:bg-dark-200"
            >
                <span>Export</span>
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
                        <div className="flex p-4 min-h-full items-center justify-center text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-100"
                                leaveFrom="opacity-100 scale-200"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform rounded-2xl bg-white dark:bg-dark-secondary p-6 text-left align-middle shadow-xl transition-all border border-gray-300">
                                    <DialogTitle className="text-lg font-medium text-black dark:text-white">
                                        Request data export - are you sure?
                                    </DialogTitle>
                                    <hr className='my-5' />
                                    <div className="mt-4 text-xs text-black dark:text-white leading-relaxed">
                                        <ul className="list-disc list-inside space-y-2">
                                            <li>Your account details and chats will be included in the export.</li>
                                            <li>The data will be sent to your registered email in a downloadable file.</li>
                                            <li>The download link will expire 24 hours after you receive it.</li>
                                            <li>Processing may take some time. You&apos;ll be notified when its ready.</li>
                                        </ul>
                                    </div>

                                    <p className="text-xs mt-4 text-black dark:text-white">
                                        To proceed, click &quot;Confirm export&quot; below.
                                    </p>
                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            onClick={() => {
                                                if (!loading) {
                                                    setConfirmationDialogOpen(false);
                                                }
                                            }}
                                            className="px-4 py-2 border border-gray-200 text-black dark:text-gray-100 text-sm
                                            font-medium hover:bg-gray-100
                                            rounded-full dark:hover:text-white transition duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleExportData}
                                            className="px-4 py-2
                                            bg-black text-white text-sm rounded-full
                                            font-medium hover:bg-black/85 transition duration-200"
                                        >
                                            Confirm export
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

export default ExportData;
