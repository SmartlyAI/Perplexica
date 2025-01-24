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
import SearxHistory from './SearxHistory';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [isSearxOpen, setIsSearxOpen] = useState(false);
    const { isSidebarOpen } = useSidebarStore();

    return (
        <div>
            {isSidebarOpen && (
                <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
                    <div className="relative flex grow flex-col overflow-y-auto bg-[#efeaf3] dark:bg-dark-secondary pl-5 py-5">
                        <div className="flex items-center justify-between">
                            <a href="/" className="flex items-center">
                                <Image src="/logo.png" priority alt="Smartly" width={24} height={24} className='mr-3' />
                                SmartlyChat
                            </a>

                            <Search
                                onClick={() => setIsSearxOpen(!isSearxOpen)}
                                className="cursor-pointer"
                            />
                        </div>

                        <History />

                        <SearxHistory
                            isOpen={isSearxOpen}
                            setIsOpen={setIsSearxOpen}
                        />
                    </div>
                </div>
            )}

            <Layout>{children}</Layout>
        </div>
    );
};

export default Sidebar;
