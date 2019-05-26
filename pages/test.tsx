import * as React from "react";
// import intl from "react-intl-universal";
import TestPage from "../src/theming/Pages/TestPage";
import LayoutBody from "../src/theming/Layout/LayoutBody";
import { ITestState } from "../src/theming/Pages/Applications/ITestProps";

export default class Test extends React.Component<ITestState> {
    static crumbs = [{ href: "/", title: "Home" }];
    render() {
        return (
            <LayoutBody crumbs={Test.crumbs} title={["Test"]}>
                <TestPage initDone />
            </LayoutBody>
        );
    }
}
