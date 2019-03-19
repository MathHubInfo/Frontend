import * as React from "react";
import LayoutBody from "../../src/theming/Layout/LayoutBody";
import { default as TGViewComponent } from "../../src/lib/components/TGView";

export default class TGView extends React.Component {
    static readonly crumbs = [{href: "/", title: "Home"}];

    render() {
        return (
            <LayoutBody crumbs={TGView.crumbs} title={["TGView (Dummy)"]}>
                <TGViewComponent instanceKey="never-recreate" />
            </LayoutBody>
        );
    }
}
