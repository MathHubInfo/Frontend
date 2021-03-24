import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const Body = dynamic(() => import("../../src/layout/Body"));
const TGViewComponent = dynamic(() => import("../../src/components/TGView"));

class TGView extends React.Component<TranslateProps> {
    render() {
        const { t } = this.props;
        const crumbs = [{ href: "/", title: t("home") }];

        return (
            <Body crumbs={crumbs} title={["TGView (Dummy)"]}>
                <TGViewComponent instanceKey="never-recreate" />
            </Body>
        );
    }
}

export default WithTranslate(TGView);
