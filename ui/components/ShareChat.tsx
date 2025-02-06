import { Share } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ShareDialog from './ShareDialog';

const ShareChat = ({
    chatId,
}: {
    chatId: string;
}) => {
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const t = useTranslations('Options.Share');

    return (
        <>
            <button
                onClick={() => {
                    setConfirmationDialogOpen(true);
                }}
                className="bg-transparent flex items-center px-4 py-3 hover:bg-light-200 dark:hover:bg-dark-200"
            >
                <Share size={17} className='mr-3' />
                <span>{t("action")}</span>
            </button>
            <ShareDialog
                chatId={chatId}
                isOpen={confirmationDialogOpen}
                setIsOpen={setConfirmationDialogOpen}
            />
        </>
    );
};

export default ShareChat;
