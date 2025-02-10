import { useState } from "react";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: "top" | "bottom" | "right";
}

export default function Tooltip({ children, content, position = "top" }: TooltipProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div
                    className={`absolute ${position === "top" ? "left-1/2 transform -translate-x-1/2 flex flex-col items-center -top-12" : position === "bottom" ? "left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-2" : "left-full transform -translate-y-8 flex items-center"}`}
                >
                    {position === "top" && (
                        <div className="bg-gray-800 text-white px-3 py-2 rounded shadow-md whitespace-nowrap">
                            {content}
                        </div>
                    )}
                    <div
                        className={`w-0 h-0 border-transparent ${position === "top"
                            ? "border-l-4 border-r-4 border-t-4 border-t-gray-800"
                            : position === "bottom" ? "border-l-4 border-r-4 border-b-4 border-b-gray-800" : "border-t-4 border-b-4 border-r-4 border-r-gray-800"
                            }`}
                    ></div>
                    {position === "bottom" && (
                        <div className="bg-gray-800 text-white px-3 py-2 rounded shadow-md whitespace-nowrap">
                            {content}
                        </div>
                    )}
                    {position === "right" && (
                        <div className="bg-gray-800 text-white px-3 py-2 rounded shadow-md whitespace-nowrap">
                            {content}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
