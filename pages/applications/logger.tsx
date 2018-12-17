import { NextContext } from "next";
import * as React from "react";

import getContext from "../../src/context";
import LoggerClient from "../../src/context/LoggerClient";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import { ILoggerImplicits, ILoggerState } from "../../src/theming/Pages/Applications/ILoggerProps";
import PageApplicationsLogger from "../../src/theming/Pages/Applications/PageApplicationsLogger";

interface ILoggerProps {
    initial: Partial<ILoggerImplicits>;
}

export default class Logger extends React.Component<ILoggerProps, ILoggerState> {
    constructor(props: ILoggerProps) {
        super(props);

        const {httpClient, config: {libraryURL}} = getContext();
        this.client = (libraryURL && process.browser) ?
            new LoggerClient(libraryURL, httpClient, true) : null;
    }

    static implicits = new ImplicitParameters<ILoggerImplicits>(
        { filter: null },
        { filter: ImplicitParameters.firstString("") },
    );

    static readonly crumbs = [{href: "/", title: "Home"}];

    static async getInitialProps({query}: NextContext): Promise<ILoggerProps> {
        const initial = Logger.implicits.readImplicits(query);

        return { initial };
    }

    state: ILoggerState = {filter: "", ...this.props.initial, entries: []};
    private readonly client: LoggerClient | null;

    async componentDidMount() {
        await Logger.implicits.setImplicits({filter: this.state.filter});
        if (this.client)
            this.client.poll(entries => this.setState({entries: entries.reverse()}))
                .catch(_ => {
                    if (this.client) this.client.stopPoll();
                    this.setState({ entries: [] });
                });
    }

    componentWillUnmount() {
        if (this.client)
            this.client.stopPoll();
    }

    async componentDidUpdate(_: ILoggerProps, prevState: ILoggerState) {
        return Logger.implicits.updateImplicits({filter: this.state.filter}, {filter: prevState.filter});
    }

    render() {
        const { entries, filter } = this.state;

        return (
            <LayoutBody crumbs={Logger.crumbs} title={["Logger"]}>
                <PageApplicationsLogger
                    entries={entries.filter(e => e.prefix.startsWith(filter))}
                    filter={filter}
                    changeFilter={this.changeFilter}
                />
            </LayoutBody>
        );
    }

    private readonly changeFilter = (filter: string) => {
        this.setState({filter});
    }
}
