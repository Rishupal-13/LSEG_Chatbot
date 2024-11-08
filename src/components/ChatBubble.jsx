import React from 'react';

function ChatBubble({ message, onSelectOption }) {
    return (
        <div className={`chat-bubble ${message.type}`}>
            <p>{message.text}</p>
            {message.options && message.options.length > 0 && (
                <div className="chat-options">
                    {message.options.map((option, index) => (
                        <button 
                            key={index} 
                            className="chat-option" 
                            onClick={() => onSelectOption(option)}
                            disabled={message.disabled} 
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatBubble;
