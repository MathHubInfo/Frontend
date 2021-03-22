import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../../src/layout/LayoutBody"));
const TGViewComponent = dynamic(() => import("../../src/components/TGView"));

class TGView extends React.Component<TranslateProps> {
    render() {
        const { t } = this.props;
        const crumbs = [{ href: "/", title: t("home") }];

        return (
            <LayoutBody crumbs={crumbs} title={["TGView (Dummy)"]}>
                <TGViewComponent instanceKey="never-recreate" />
            </LayoutBody>
        );
    }
}

export default WithTranslate(TGView);
