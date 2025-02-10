'use client';

import { PanelRightOpen, Search, SquarePen } from 'lucide-react';
import React, { useState, type ReactNode } from 'react';
import Layout from './Layout';
import History from './History';
import useSidebarStore from '@/stores/global-stores';
import SearxHistory from './SearxHistory';
import Link from 'next/link';
import Tooltip from './Tooltip';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [isSearxOpen, setIsSearxOpen] = useState(false);
    const { toggleSidebar } = useSidebarStore();
    const { isSidebarOpen } = useSidebarStore();

    return (
        <div className='relative flex h-full w-full overflow-hidden transition-colors'>
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 lg:static h-full transition-all duration-300 w-[260px] z-50" style={{ zIndex: 50 }}>
                    <div className="h-full bg-[#f9f9f9] dark:bg-dark-secondary px-5 py-5">
                        <div className="flex items-center justify-between">
                            {/* <a href="/" className="flex items-center">
                                <Image src="/logo.png" priority alt="Smartly" width={24} height={24} className='mr-3' />
                                SmartlyChat
                            </a> */}
                             
                            <div className="">
                            <Tooltip content='close sidebar' position="right" >
                                <PanelRightOpen className="cursor-pointer" onClick={toggleSidebar} />
                             </Tooltip>
                            </div>

                            <div className="flex gap-2">
                                <Tooltip content='Search chats' position="bottom" >
                                <Search
                                    onClick={() => setIsSearxOpen(!isSearxOpen)}
                                    className="cursor-pointer"
                                />
                                </Tooltip>
                                <Tooltip content="New Chat" position="bottom">
                                <Link href="/"><SquarePen className="cursor-pointer" /></Link>
                                </Tooltip>
                            </div>
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
