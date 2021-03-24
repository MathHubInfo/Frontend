import * as React from "react";
import { Popup, Table } from "semantic-ui-react";

import { default as keysJson } from "../../assets/applications/keys.json";
import { IStatistic } from "../../context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";

interface StatisticsProps {
    statistics?: IStatistic[];
}

/** A Table showing statistics */
class Statistics extends React.Component<StatisticsProps & TranslateProps> {
    render() {
        const { t, statistics } = this.props;

        if (statistics === undefined || statistics.length === 0) return <p>{t("no")}</p>;

        return (
            <Table collapsing>
                <Table.Body>
                    {statistics.map(s => (
                        <StatisticsElement key={s.key} name={s.key} value={s.value} />
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

export default WithTranslate(Statistics);

interface StatisticsElementProps {
    name: string;
    value?: number;
}

interface StatisticsElementState {
    key: string;
    teaser: string;
    description: string;
}

/** An Element within the statistics table */
class StatisticsElement extends React.Component<StatisticsElementProps, Partial<StatisticsElementState>> {
    state: Partial<StatisticsElementState> = {};
    static getDerivedStateFromProps({ name }: StatisticsElementProps): Partial<StatisticsElementState> {
        return keysJson.find(v => v.key === name) ?? {};
    }
    render() {
        const { value, name } = this.props;
        if (value === null) return null;

        const { teaser, description } = this.state;
        if (teaser && description) {
            return (
                <Popup
                    trigger={
                        <Table.Row>
                            <Table.Cell>{teaser}</Table.Cell>
                            <Table.Cell>{value}</Table.Cell>
                        </Table.Row>
                    }
                    content={description}
                />
            );
        }

        return (
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
            </Table.Row>
        );
    }
}
