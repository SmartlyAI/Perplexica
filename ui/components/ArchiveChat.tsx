import { Archive } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const ArchiveChat = ({
    chatId,
    fetchChats,
}: {
    chatId: string;
    fetchChats: () => void;
}) => {
    const t = useTranslations('Options');
    const handleArchive = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}/archive`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ archived: 1 }),
                },
            );

            if (res.status != 200) {
                throw new Error('Failed to archive chat');
            }

            fetchChats();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <button
            onClick={handleArchive}
            className="bg-transparent flex items-center px-4 py-3 hover:bg-light-200 dark:hover:bg-dark-200"
        >
            <Archive size={17} className='mr-3' />
            <span>{t("Archive")}</span>
        </button>
    );
};

export default ArchiveChat;
