import { useState } from "react";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 flex flex-col items-center">
                    <div className="bg-gray-800 text-sm text-white px-3 py-2 rounded-lg shadow-md whitespace-nowrap">
                        {content}
                    </div>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </div>
    );
}
