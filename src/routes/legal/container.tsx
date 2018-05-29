import * as React from "react";

export class LegalContainer extends React.Component<{text: string}> {
    private preventRightClick(e: React.MouseEvent<any>) {
        e.preventDefault();
        return false;
    }
    public render() {
        return (
            <div
                style={{
                    MozUserSelect: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    fontFamily: "monospace",
                    msUserSelect: "none",
                    userSelect: "none",
                }}
                onContextMenu={this.preventRightClick}
            >{
                this.props.text.split("\n").map(
                    (l: string, i: number) => <span key={i}>{l}<br /></span>,
                )
            }
            </div>
        );
    }
}
