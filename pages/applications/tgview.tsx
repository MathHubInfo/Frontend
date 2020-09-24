import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import { default as TGViewComponent } from "../../src/components/TGView";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

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
