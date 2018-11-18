import * as React from "react";

import { Container, Divider, Header } from "semantic-ui-react";

import { BreadCrumbsAsSlot, TextSlot, TitleAsSlot } from "./slots";

import { PropsOfComponent } from "../../types/react";
import { MemberType } from "../../types/utils";
import { Breadcrumbs } from "../common";
type IBreadCrumbPart = MemberType<PropsOfComponent<Breadcrumbs>["crumbs"]>;

import { HTML } from "../fragments";

export default class Body extends React.Component {
    public render() {
        return (
            <>
                <Container text style={{ marginTop: "7em" }}>
                    <BreadCrumbsSlot />
                    <TitleSlot />
                    <Container>
                        <TextSlot />
                    </Container>
                </Container>
                <Divider />
                <Container>
                    {this.props.children}
                </Container>
            </>
        );
    }
}

/** the page title */
const TitleSlot = TitleAsSlot(class extends React.Component<{fills: string[]}> {
    public static displayName = "TitleSlot";
    public render() {
        const { fills } = this.props;
        return <HTML as={Header} extra={{as: "h1", style: {marginTop: 0}}}>{fills.join(" | ")}</HTML>;

    }
});

/** the bread crumbs */
const BreadCrumbsSlot = BreadCrumbsAsSlot(class extends React.Component<{fills: IBreadCrumbPart[][]}> {
    public static displayName = "BreadCrumbsSlot";
    public render() {
        const { fills } = this.props;
        if (fills.length === 0) {
            return <Breadcrumbs crumbs={[{text: "Home", url: ""}, {text: "[Loading]"}]} />;
        } else if (fills.length === 1) {
            return <Breadcrumbs crumbs={fills[0]} />;
        } else {
            return <Breadcrumbs crumbs={[{text: "Home", url: ""}, {text: "[Multiple]"}]} />;
        }
    }
});
