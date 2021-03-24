import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { default as keysJSON } from "../../src/assets/applications/keys.json";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

import styles from "./keys.module.css";

const Body = dynamic(() => import("../../src/layout"));

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
            <Body crumbs={[{ href: "/", title: "Home" }]} title={["Keys"]}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.cell1}>Key</th>
                            <th className={styles.cell2}>
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
            </Body>
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
