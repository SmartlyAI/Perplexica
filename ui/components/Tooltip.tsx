import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: "top" | "bottom" | "right";
}

export default function Tooltip({ children, content, position = "top" }: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const ref = useRef<HTMLDivElement | null>(null);

    const getScrollParent = (element: HTMLElement | null): HTMLElement | null => {
        if (!element) return null;
        let parent: HTMLElement | null = element.parentElement;
        while (parent) {
            const overflowY = window.getComputedStyle(parent).overflowY;
            if (overflowY === "auto" || overflowY === "scroll") {
                return parent;
            }
            parent = parent.parentElement;
        }
        return document.documentElement;
    };

    const updateTooltipPosition = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();

            setCoords({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        }
    };

    const handleMouseEnter = () => {
        updateTooltipPosition();
        setVisible(true);
    };

    useEffect(() => {
        if (!visible) return;

        const scrollParent = getScrollParent(ref.current);
        scrollParent?.addEventListener("scroll", updateTooltipPosition);

        return () => scrollParent?.removeEventListener("scroll", updateTooltipPosition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    return (
        <div ref={ref} className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={() => setVisible(false)}>
            {children}

            {visible &&
                createPortal(
                    <div
                        className="fixed z-50"
                        style={{
                            top:
                                position === "top"
                                    ? coords.top - 40
                                    : position === "bottom"
                                    ? coords.top + coords.height + 10
                                    : coords.top + coords.height / 2,
                            left:
                                position === "right"
                                    ? coords.left + coords.width + 10
                                    : coords.left + coords.width / 2
                        }}
                    >
                        <div className="bg-gray-800 text-white px-3 py-2 rounded shadow-md whitespace-nowrap">
                            {content}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}
