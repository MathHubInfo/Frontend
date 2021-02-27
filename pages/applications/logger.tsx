import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import getMathHubConfig from "../../src/context";
import LoggerClient from "../../src/context/LoggerClient";
import { ILoggerImplicits, ILoggerState } from "../../src/theming/Pages/Applications/PageApplicationsLogger";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const PageApplicationsLogger = dynamic(() => import("../../src/theming/Pages/Applications/PageApplicationsLogger"));

interface ILoggerProps {
    initial: Partial<ILoggerImplicits>;
}

export default class Logger extends React.Component<ILoggerProps, ILoggerState> {
    constructor(props: ILoggerProps) {
        super(props);

        const {
            httpClient,
            config: { LIBRARY_URL: libraryURL },
        } = getMathHubConfig();
        this.client = libraryURL && process.browser ? new LoggerClient(libraryURL, httpClient, true) : null;
    }

    static implicits = new ImplicitParameters<ILoggerImplicits>(
        { filter: null },
        { filter: ImplicitParameters.firstString("") },
    );

    static readonly crumbs = [{ href: "/", title: "Home" }];

    static async getInitialProps({ query }: NextPageContext): Promise<ILoggerProps> {
        const initial = Logger.implicits.readImplicits(query);

        return { initial };
    }

    state: ILoggerState = { filter: "", ...this.props.initial, entries: [] };
    private readonly client: LoggerClient | null;

    async componentDidMount() {
        await Logger.implicits.setImplicits({ filter: this.state.filter });
        if (this.client)
            this.client
                .poll(entries => this.setState({ entries: entries.reverse() }))
                .catch(() => {
                    if (this.client) this.client.stopPoll();
                    this.setState({ entries: [] });
                });
    }

    componentWillUnmount() {
        if (this.client) this.client.stopPoll();
    }

    async componentDidUpdate(_: ILoggerProps, prevState: ILoggerState) {
        return Logger.implicits.updateImplicits({ filter: this.state.filter }, { filter: prevState.filter });
    }

    render() {
        const { entries, filter } = this.state;

        return (
            <LayoutBody crumbs={[{ href: "/", title: intl.get("home") }]} title={[intl.get("logger")]}>
                <PageApplicationsLogger
                    entries={entries.filter(e => e.prefix.startsWith(filter))}
                    filter={filter}
                    changeFilter={this.changeFilter}
                />
            </LayoutBody>
        );
    }

    private readonly changeFilter = (filter: string) => {
        this.setState({ filter });
    };
}
