import React, { useState } from 'react';

type ToolTipProps = {
    content: string;
    children: React.ReactNode;
    delay?: number;
};

const ToolTip = ({ content, children, delay = 500 }: ToolTipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const handleMouseEnter = () => {
        const id = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setIsVisible(false);
    };

    const getTooltipPosition = (): React.CSSProperties => {
        // 위치: 버튼 왼쪽 위
        return {
            position: 'absolute',
            left: '-225px',
            top: '-42px'
        };
    };

    return (
        <div 
            className="relative inline-block w-fit h-fit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <div
                    className="absolute rounded-tl-xl rounded-tr-xl rounded-bl-xl max-w-[280px] bg-[#FCF8FF] px-4 py-2 shadow-md z-30 body-medium-emphasis text-[#16134A] pointer-events-none transition-opacity duration-200 whitespace-pre-line"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        ...getTooltipPosition()
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default ToolTip;