import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import LoggerClient from "../../src/context/LoggerClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import { ILoggerImplicits, ILoggerState } from "../../src/theming/Pages/Applications/PageApplicationsLogger";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const PageApplicationsLogger = dynamic(() => import("../../src/theming/Pages/Applications/PageApplicationsLogger"));

interface ILoggerProps {
    initial: Partial<ILoggerImplicits>;
}

class Logger extends React.Component<ILoggerProps & TranslateProps, ILoggerState> {
    constructor(props: ILoggerProps & TranslateProps) {
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

    static async getInitialProps({ query }: NextPageContext): Promise<ILoggerProps> {
        const initial = Logger.implicits.readImplicits(query);

        return { initial };
    }

    state: ILoggerState = { filter: "", ...this.props.initial, entries: [] };
    private readonly client: LoggerClient | null;

    async componentDidMount() {
        await Logger.implicits.setImplicits({ filter: this.state.filter });
        if (!this.client) return;

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
        const { t } = this.props;
        const { entries, filter } = this.state;

        return (
            <LayoutBody crumbs={[{ href: "/", title: t("home") }]} title={[t("logger")]}>
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

export default WithTranslate(Logger);
