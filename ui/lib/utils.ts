import { Chat } from '@/components/History';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const formatTimeDifference = (
  date1: Date | string,
  date2: Date | string,
): string => {
  date1 = new Date(date1);
  date2 = new Date(date2);

  const diffInSeconds = Math.floor(
    Math.abs(date2.getTime() - date1.getTime()) / 1000,
  );

  if (diffInSeconds < 60)
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''}`;
  else if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minute${Math.floor(diffInSeconds / 60) !== 1 ? 's' : ''}`;
  else if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) !== 1 ? 's' : ''}`;
  else if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? 's' : ''}`;
  else
    return `${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) !== 1 ? 's' : ''}`;
};

export const getChatId = () => {
  const match = window.location.pathname.match(/\/c\/([^/]+)/);
  return match ? match[1] : null;
};

export const isRtl = (text: string): boolean => {
  const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlRegex.test(text);
};

export const isLg = () => { return typeof window !== 'undefined' ? window.matchMedia("(min-width: 1024px)").matches : null };
export const isSM = () => { return typeof window !== 'undefined' ? window.matchMedia("(min-width: 640px)").matches : null };
export const isXsM = () => { return typeof window !== 'undefined' ? window.matchMedia("(max-width: 639px)").matches : null };


export const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
};

export const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();
};

export const isWithinDays = (date: Date, days: number) => {
  const compareDate = new Date();
  compareDate.setDate(compareDate.getDate() - days);
  return date > compareDate;
};

export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const groupChatsByDate = (chats: Chat[]) => {
  return chats.reduce((groups, chat) => {
      const chatDate = new Date(chat.createdAt);

      if (isToday(chatDate)) {
          if (!groups.Today) groups.Today = [];
          groups.Today.push(chat);
      } else if (isYesterday(chatDate)) {
          if (!groups.Yesterday) groups.Yesterday = [];
          groups.Yesterday.push(chat);
      } else if (isWithinDays(chatDate, 7)) {
          if (!groups['Previous 7 Days']) groups['Previous 7 Days'] = [];
          groups['Previous 7 Days'].push(chat);
      } else if (isWithinDays(chatDate, 30)) {
          if (!groups['Previous 30 Days']) groups['Previous 30 Days'] = [];
          groups['Previous 30 Days'].push(chat);
      } else {
          const currentYear = new Date().getFullYear();
          const chatYear = chatDate.getFullYear();

          if (chatYear === currentYear) {
              const monthName = monthNames[chatDate.getMonth()];
              if (!groups[monthName]) groups[monthName] = [];
              groups[monthName].push(chat);
          } else {
              const yearName = chatYear.toString();
              if (!groups[yearName]) groups[yearName] = [];
              groups[yearName].push(chat);
          }
      }

      return groups;
  }, {} as Record<string, Chat[]>);
};

export const orderedGroups = [
  "Today",
  "Yesterday",
  "Previous 7 Days",
  "Previous 30 Days",
  ...monthNames,
];

