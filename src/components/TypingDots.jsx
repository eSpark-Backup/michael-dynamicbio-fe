import React from 'react'

const TypingDots = ({ className }) => {
    return (
        <div className={`${className} typing-indicator`}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
}

export default TypingDots
