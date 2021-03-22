import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import LoggerClient from "../../src/context/LoggerClient";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

import { Container, Input, Table } from "semantic-ui-react";
import { ILogEntry } from "../../src/context/LoggerClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../../src/layout/LayoutBody"));

interface ILoggerState extends ILoggerImplicits {
    /**
     * The current log entries
     */
    entries: ILogEntry[];
}

interface ILoggerImplicits {
    /**
     * The current filter
     */
    filter: string;
}

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
                <Container>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell style={{ width: "20%" }}>{t("date")}</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: "20%" }}>
                                    <Input
                                        type="text"
                                        value={filter}
                                        onChange={this.changeFilter}
                                        placeholder="Filter"
                                    />
                                </Table.HeaderCell>
                                <Table.HeaderCell style={{ width: "60%" }}>{t("content")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {entries
                                .filter(e => e.prefix.startsWith(filter))
                                .map(e => (
                                    <LoggerTableRow entry={e} key={e.uuid} />
                                ))}
                        </Table.Body>
                    </Table>
                </Container>
            </LayoutBody>
        );
    }

    private readonly changeFilter = ({ target: { value: filter } }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ filter });
    };
}

export default WithTranslate(Logger);

class LoggerTableRow extends React.Component<{ entry: ILogEntry }> {
    render() {
        const { entry } = this.props;

        return (
            <Table.Row>
                <Table.Cell>{new Date(entry.time).toTimeString()}</Table.Cell>
                <Table.Cell>{entry.prefix}</Table.Cell>
                <Table.Cell>{entry.parts.join("\n")}</Table.Cell>
            </Table.Row>
        );
    }
}
