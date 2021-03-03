import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../src/theming/Layout/LayoutBody"));
const PageHome = dynamic(() => import("../src/theming/Pages/PageHome"));

class Home extends React.Component<TranslateProps> {
    static crumbs = [];
    render() {
        const { t } = this.props;
        return (
            <LayoutBody crumbs={Home.crumbs} title={[t("home")]} description={t("home")}>
                <PageHome>{t("introduction")}</PageHome>
            </LayoutBody>
        );
    }
}

export default WithTranslate(Home);
