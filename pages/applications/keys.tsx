// tslint:disable:export-name
import { NextPageContext } from "next";
import * as React from "react";

import { default as keysJSON } from "../../src/assets/applications/keys.json";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

import LayoutBody from "../../src/theming/Layout/LayoutBody";

import { IKeysState } from "../../src/theming/Pages/Applications/IKeysProps.js";
import PageApplicationsKeys from "../../src/theming/Pages/Applications/PageApplicationsKeys";

interface IKeysProps {
    initial: Partial<IKeysState>;
}

export default class Glossary extends React.Component<IKeysProps, IKeysState> {
    static implicits = new ImplicitParameters<IKeysState>(
        { expanded: "expand" },
        { expanded: ImplicitParameters.first<boolean>(x => x.toLowerCase().trim() === "true", false) },
    );

    static async getInitialProps({ query }: NextPageContext): Promise<IKeysProps> {
        const initial = Glossary.implicits.readImplicits(query);

        return { initial };
    }

    state = {expanded: false, ...this.props.initial};

    async componentDidUpdate(_: IKeysProps, prevState: IKeysState) {
        return Glossary.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Glossary.implicits.setImplicits(this.state);
    }


    render() {
        const { expanded } = this.state;

        return (
            <LayoutBody crumbs={[{href: "/", title: "Home"}]} title={["Keys"]}>
                <PageApplicationsKeys keys={keysJSON} expanded={expanded} toggleExpansion={this.toggleExpansion} />
            </LayoutBody>
        );
    }

    private readonly toggleExpansion = () => this.setState(({expanded}) => ({expanded: !expanded}));
}
