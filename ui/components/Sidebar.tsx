'use client';

import { PanelRightOpen, Search, SquarePen } from 'lucide-react';
import React, { useState, type ReactNode } from 'react';
import Layout from './Layout';
import History from './History';
import useSidebarStore from '@/stores/global-stores';
import SearxHistory from './SearxHistory';
import Link from 'next/link';
import Tooltip from './Tooltip';
import { useTranslations } from 'next-intl';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [isSearxOpen, setIsSearxOpen] = useState(false);
    const { toggleSidebar } = useSidebarStore();
    const { isSidebarOpen } = useSidebarStore();
    const t = useTranslations('Sidebar');
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
                            <Tooltip content={t("closeSidebar")} position="right" >
                            <div
                                className="cursor-pointer text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg"
                                onClick={toggleSidebar}
                            >
                                <PanelRightOpen />
                            </div>
                             </Tooltip>
                            </div>

                            <div className="flex gap-2">
                                <Tooltip content={t("searchChats")} position="bottom" >
                                <div
                                    className="cursor-pointer text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg"
                                    onClick={() => setIsSearxOpen(!isSearxOpen)}
                                >
                                    <Search />
                                </div>
                                </Tooltip>
                                <Tooltip content={t("newChat")} position="bottom">
                                <Link href="/">
                                <div className="cursor-pointer text-[#5d5d5d] p-2 hover:bg-[#e7e7e7] dark:hover:bg-gray-600 transition-colors rounded-lg">
                                    <SquarePen />
                                </div>
                                </Link>
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
