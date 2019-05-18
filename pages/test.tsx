import * as React from "react";
import intl from "react-intl-universal";
import TestPage from "../src/theming/Pages/TestPage";
import LayoutBody from "../src/theming/Layout/LayoutBody";
import { ITestState } from "../src/theming/Pages/Applications/ITestProps";

export default class Test extends React.Component<ITestState> {
    static crumbs = [{ href: "/", title: "Home" }];

    state = { initDone: false };

    async componentDidMount() {
        await this.loadLocales();
    }
    async loadLocales() {
        const currentLocale = "en";

        await import(`../src/locales/${currentLocale}.json`)
            .then(async res => {
                // init method will load CLDR locale data according to currentLocale
                return intl.init({
                    currentLocale,
                    locales: {
                        [currentLocale]: res,
                    },
                });
            })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }
    render() {
        return (
            <LayoutBody crumbs={Test.crumbs} title={["Test"]}>
                <TestPage initDone={this.state.initDone} />
            </LayoutBody>
        );
    }
}
