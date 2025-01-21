'use client';

import { cn } from '@/lib/utils';
import { BookOpenText, Home, Search, SquarePen, Settings } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useState, type ReactNode } from 'react';
import Layout from './Layout';
import SettingsDialog from './SettingsDialog';
import History from './History';
import Image from 'next/image';
import useSidebarStore from '@/stores/global-stores';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const segments = useSelectedLayoutSegments();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { isSidebarOpen } = useSidebarStore();

    const navLinks = [
        {
            icon: Home,
            href: '/',
            active: segments.length === 0 || segments.includes('c'),
            label: 'Home',
        },
        {
            icon: Search,
            href: '/discover',
            active: segments.includes('discover'),
            label: 'Discover',
        },
        {
            icon: BookOpenText,
            href: '/library',
            active: segments.includes('library'),
            label: 'Library',
        },
    ];

    return (
        <div>
            {isSidebarOpen && (
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
                    <div className="relative flex grow flex-col overflow-y-auto bg-[#efeaf3] dark:bg-dark-secondary px-4 py-8">
                        <a href="/" className="flex items-center">
                            <Image src="/logo.png" priority alt="Smartly" width={34} height={41} className='mr-4' />
                            SmartlyChat
                        </a>

                        <History />
                        <div className='fixed bottom-5 left-4 right-0'>
                            <Settings
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className="cursor-pointer"
                            />
                        </div>

                        <SettingsDialog
                            isOpen={isSettingsOpen}
                            setIsOpen={setIsSettingsOpen}
                        />
                    </div>
                </div>
            )}

            <Layout>{children}</Layout>
        </div>
    );
};

export default Sidebar;
