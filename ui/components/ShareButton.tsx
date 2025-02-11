import { Upload } from 'lucide-react';
import ShareDialog from './ShareDialog';
import { useTranslations } from 'next-intl';

const ShareButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const t = useTranslations('Options.Share');
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-3xl bg-[#ffffff] dark:bg-dark-primary border border-gray-200 dark:border-[#ffffff] hover:bg-gray-100 dark:hover:bg-dark-primary mr-3"
      >
        <Upload className="h-4 w-4" />
        <span>{t("action")}</span>
      </button>
      <ShareDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ShareButton;
