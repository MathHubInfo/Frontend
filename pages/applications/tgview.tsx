import * as React from "react";
import intl from "react-intl-universal";
import LayoutBody from "../../src/theming/Layout/LayoutBody";
import { default as TGViewComponent } from "../../src/lib/components/TGView";

export default class TGView extends React.Component {
    render() {
        const crumbs = [{ href: "/", title: intl.get("home") }];

        return (
            <LayoutBody crumbs={crumbs} title={["TGView (Dummy)"]}>
                <TGViewComponent instanceKey="never-recreate" />
            </LayoutBody>
        );
    }
}
