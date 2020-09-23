import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { default as keysJSON } from "../../src/assets/applications/keys.json";
import { IKeysState } from "../../src/theming/Pages/Applications/PageApplicationsKeys";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const PageApplicationsKeys = dynamic(() => import("../../src/theming/Pages/Applications/PageApplicationsKeys"));

interface IKeysProps {
    initial: Partial<IKeysState>;
}

export default class Keys extends React.Component<IKeysProps, IKeysState> {
    static implicits = new ImplicitParameters<IKeysState>(
        { expanded: "expand" },
        { expanded: ImplicitParameters.first<boolean>(x => x.toLowerCase().trim() === "true", false) },
    );

    static async getInitialProps({ query }: NextPageContext): Promise<IKeysProps> {
        const initial = Keys.implicits.readImplicits(query);

        return { initial };
    }

    state = {expanded: false, ...this.props.initial};

    async componentDidUpdate(_: IKeysProps, prevState: IKeysState) {
        return Keys.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Keys.implicits.setImplicits(this.state);
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
