import * as React from "react";
import { Container, Divider, Header } from "semantic-ui-react";

import { PropsOfComponent } from "../../Types/react";
import { MemberType } from "../../Types/utils";
import { Breadcrumbs } from "../Common";
import { HTML } from "../Fragments";

import { BreadCrumbsAsSlot, TextSlot, TitleAsSlot } from "./Slots";

type IBreadCrumbPart = MemberType<PropsOfComponent<Breadcrumbs>["crumbs"]>;

export default class Body extends React.Component {
    render() {
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

// the page title
const TitleSlot = TitleAsSlot(class extends React.Component<{fills: string[]}> {
    static displayName = "TitleSlot";
    render() {
        const { fills } = this.props;

        return <HTML as={Header} extra={{as: "h1", style: {marginTop: 0}}}>{fills.join(" | ")}</HTML>;

    }
});

// the bread crumbs
const BreadCrumbsSlot = BreadCrumbsAsSlot(class extends React.Component<{fills: IBreadCrumbPart[][]}> {
    static displayName = "BreadCrumbsSlot";
    render() {
        const { fills } = this.props;
        if (fills.length === 0)
            return <Breadcrumbs crumbs={[{text: "Home", url: ""}, {text: "[Loading]"}]} />;
        else if (fills.length === 1)
            return <Breadcrumbs crumbs={fills[0]} />;
        else
            return <Breadcrumbs crumbs={[{text: "Home", url: ""}, {text: "[Multiple]"}]} />;
    }
});
