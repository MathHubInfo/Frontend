import * as React from "react";

/** An Element that renders all children using monospace */
export default function MonospaceContainer(props: {children: string, noTouch?: boolean}) {
    if (props.noTouch) {
        return (
            <pre
                style={{
                    MozUserSelect: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                }}
                onContextMenu={preventRightClick}
            >{props.children}
            </pre>
        );
    } else {
        return <pre>{props.children}</pre>;
    }
}

function preventRightClick(e: React.MouseEvent<any>) {
    e.preventDefault();
    return false;
}
