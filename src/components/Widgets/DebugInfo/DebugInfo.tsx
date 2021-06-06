import React, { MutableRefObject, useEffect, useRef } from "react";
import Draggable from "react-draggable";

import "./DebugInfo.scss";

interface DebugInfoProps {
    data: any;
    cols?: number;
    rows?: number;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ data, cols = 50, rows = 10 }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>() as MutableRefObject<HTMLTextAreaElement>;
    const preRef = useRef<HTMLPreElement>() as MutableRefObject<HTMLPreElement>;
    useEffect(() => {
        textAreaRef.current.style.width = `${preRef.current.offsetWidth + 15}px`;
        textAreaRef.current.style.height = `${preRef.current.offsetHeight + 30}px`;
    }, [data]);
    return (
        <Draggable>
            <div className="debug-wrapper">
                <div className="debug-info">
                    <h3>Debug Info</h3>
                    <textarea
                        style={{ overflow: "hidden" }}
                        ref={textAreaRef}
                        value={JSON.stringify(data, null, 4)}
                        readOnly
                    ></textarea>
                </div>
                <div style={{ visibility: "hidden" }}>
                    <pre style={{ width: "fit-content" }} ref={preRef}>
                        {JSON.stringify(data, null, 4)}
                    </pre>
                </div>
            </div>
        </Draggable>
    );
};

export default DebugInfo;
