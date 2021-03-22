import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { default as keysJSON } from "../../src/assets/applications/keys.json";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

const LayoutBody = dynamic(() => import("../../src/layout/LayoutBody"));

interface IKeysState {
    /**
     * Indicator if we are currently expanded
     */
    expanded: boolean;
}

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

    state = { expanded: false, ...this.props.initial };

    async componentDidUpdate(_: IKeysProps, prevState: IKeysState) {
        return Keys.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Keys.implicits.setImplicits(this.state);
    }

    render() {
        const { expanded } = this.state;

        return (
            <LayoutBody crumbs={[{ href: "/", title: "Home" }]} title={["Keys"]}>
                <div>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ width: "20%" }}>Key</th>
                                <th style={{ width: "80%" }}>
                                    Description
                                    <button onClick={this.toggleExpansion}>{expanded ? "<<" : ">>"}</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {keysJSON.map(k => (
                                <KeyRow key={k.key} item={k} expanded={expanded} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </LayoutBody>
        );
    }

    private readonly toggleExpansion = () => this.setState(({ expanded }) => ({ expanded: !expanded }));
}

/**
 * Represents a single described key
 */
interface IKey {
    key: string;
    teaser: string;
    description: string;
}

class KeyRow extends React.Component<{ item: IKey; expanded: boolean }> {
    render() {
        const {
            expanded,
            item: { key, description, teaser },
        } = this.props;

        return (
            <tr>
                <td>{key}</td>
                <td>{expanded ? description : teaser}</td>
            </tr>
        );
    }
}
