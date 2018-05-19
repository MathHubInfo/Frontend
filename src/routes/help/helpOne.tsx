import * as React from "react";

// import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

// const MENU_TYPE = "SIMPLE";

export class Help extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <h3>Help One</h3>
            </div>
        );
        /*return (
            <div>
                <h3>Simple Menu</h3>
                <p>This demo simple usage of a context menu.</p>
                <ContextMenuTrigger id={MENU_TYPE} holdToDisplay={1000}>
                    <div className="well">right click to see the menu</div>
                </ContextMenuTrigger>
                <ContextMenu id={MENU_TYPE}>
                    <MenuItem data={{ item: "item 1" }}>Menu Item 1</MenuItem>
                    <MenuItem data={{ item: "item 2" }}>Menu Item 2</MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{ item: "item 3" }}>Menu Item 3</MenuItem>
                </ContextMenu>
           </div>
        );*/
    }
}
// Put this in package.json/dependencies: "react-contextmenu": "^2.9.2"
