import React, { MutableRefObject, useRef, useState } from "react";
import { Button } from "antd";
import { NativeButtonProps } from "antd/lib/button/button";

import "./CopyToClipboard.scss";

interface CopyToClipboardProps extends NativeButtonProps {
    text: string;
    content: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, content, ...buttonProps }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>() as MutableRefObject<HTMLTextAreaElement>;
    const [copied, setCopied] = useState<boolean>(false);
    const copyText = () => {
        textAreaRef.current.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    return (
        <>
            <Button
                className="copy-to-clipboard-button"
                type="primary"
                {...buttonProps}
                onClick={copyText}
                {...(copied ? { disabled: true } : {})}
            >
                {copied ? "Copied!" : text}
            </Button>
            <textarea ref={textAreaRef} className="dummy-textarea" value={content} />
        </>
    );
};

export default CopyToClipboard;
