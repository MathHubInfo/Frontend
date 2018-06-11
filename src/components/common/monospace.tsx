import * as React from "react";

export class MonospaceContainer extends React.PureComponent<{children: string, noTouch?: boolean}> {
    private preventRightClick(e: React.MouseEvent<any>) {
        e.preventDefault();
        return false;
    }
    public render() {
        if (this.props.noTouch) {
            return (
                <pre
                    style={{
                        MozUserSelect: "none",
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                    }}
                    onContextMenu={this.preventRightClick}
                >{this.props.children}
                </pre>
            );
        } else {
            return <pre>{this.props.children}</pre>;
        }
    }
}
