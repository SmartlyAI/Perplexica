import { Upload } from 'lucide-react';
import ShareDialog from './ShareDialog';

const ShareButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center space-x-2 px-5 py-2 text-lg font-bold rounded-3xl bg-[#ffffff] dark:bg-dark-primary border border-dark-primary dark:border-[#ffffff] hover:bg-gray-100 dark:hover:bg-dark-primary"
      >
        <Upload className="h-6 w-6" />
        <span>Share</span>
      </button>
      <ShareDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ShareButton;
