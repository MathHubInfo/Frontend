import * as React from "react";

import { Container, Divider, Header, List, Tab } from "semantic-ui-react";

import { LoadWithSpinner } from "../../components/common/lazy";
import { IMathHubContext, WithContext } from "../../context";
import { IGlossaryEntry } from "../../context/api";

export class Glossary extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <Container text>
                    <Header as="h1">
                        <div>Glossary</div>
                    </Header>
                </Container>
                <Divider />
                <GlossaryEntryTabs />
            </>
        );
    }
}

const GlossaryEntryTabs = WithContext((context: IMathHubContext) => class extends React.Component<{}> {

    constructor(props: {}) {
        super(props);
        this.getGlossary = this.getGlossary.bind(this);
    }

    private getGlossary() { return context.client.getGlossary(); }

    public render() {

        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <Tab
                        panes={[
                            {
                                menuItem: "en", render: () =>
                                    <List bulleted>
                                        {glossary
                                            .filter((e) => e.kind === "entry")
                                            .map((entry) =>
                                                <GlossaryEntry key={entry.id} entry={entry} language="en" />)}
                                    </List>,
                            },
                            {
                                menuItem: "de", render: () =>
                                    <List bulleted>
                                        {glossary
                                            .filter((e) => e.kind === "entry")
                                            .map((entry) =>
                                                <GlossaryEntry key={entry.id} entry={entry} language="de" />)}
                                    </List>,
                            },
                            {
                                menuItem: "ro", render: () =>
                                    <List bulleted>
                                        {glossary
                                            .filter((e) => e.kind === "entry")
                                            .map((entry) =>
                                                <GlossaryEntry key={entry.id} entry={entry} language="ro" />)}
                                    </List>,
                            },
                            {
                                menuItem: "tr", render: () =>
                                    <List bulleted>
                                        {glossary
                                            .filter((e) => e.kind === "entry")
                                            .map((entry) =>
                                                <GlossaryEntry key={entry.id} entry={entry} language="tr" />)}
                                    </List>,
                            },
                            {
                                menuItem: "zht", render: () =>
                                    <List bulleted>
                                        {glossary
                                            .filter((e) => e.kind === "entry")
                                            .map((entry) =>
                                                <GlossaryEntry key={entry.id} entry={entry} language="zht" />)}
                                    </List>,
                            },
                            {
                                menuItem: "zhs", render: () =>
                                    <List bulleted>
                                        {glossary
                                            .filter((e) => e.kind === "entry")
                                            .map((entry) =>
                                                <GlossaryEntry key={entry.id} entry={entry} language="zhs" />)}
                                    </List>,
                            },
                        ]}
                    />
            }</LoadWithSpinner>
        );

    }
});

class GlossaryEntry extends React.Component<{ entry: IGlossaryEntry, language: string }> {
    private other() {
        const { entry } = this.props;
        const { language } = this.props;
        let ret = "=>";
        if (language !== "en" && entry.kwd.en !== undefined) {
            ret = ret + " en";
        }
        if (language !== "de" && entry.kwd.de !== undefined) {
            ret = ret + " de";
        }
        if (language !== "ro" && entry.kwd.ro !== undefined) {
            ret = ret + " ro";
        }
        if (language !== "tr" && entry.kwd.tr !== undefined) {
            ret = ret + " tr";
        }
        if (language !== "zht" && entry.kwd.zht !== undefined) {
            ret = ret + " zht";
        }
        if (language !== "zhs" && entry.kwd.zhs !== undefined) {
            ret = ret + " zhs";
        }
        if (ret === "=>") {
            return "";
        }
        return ret;
    }
    public render() {
        const { entry } = this.props;
        const { language } = this.props;
        switch (language) {
            case "en":
                if (entry.kwd.en === undefined) {
                    return (<></>);
                }
                return (
                    <List.Item>
                        <h3>{entry.kwd.en}</h3>
                        <div dangerouslySetInnerHTML={{ __html: (entry.def.en === undefined ? "" : entry.def.en) }} />
                        <>{this.other()}</>
                    </List.Item >
                );
            case "de":
                if (entry.kwd.de === undefined) {
                    return (<></>);
                }
                return (
                    <List.Item>
                        <h3>{entry.kwd.de}</h3>
                        <div dangerouslySetInnerHTML={{ __html: (entry.def.de === undefined ? "" : entry.def.de) }} />
                        <>{this.other()}</>
                    </List.Item>
                );
            case "ro":
                if (entry.kwd.ro === undefined) {
                    return (<></>);
                }
                return (
                    <List.Item>
                        <h3>{entry.kwd.ro}</h3>
                        <div dangerouslySetInnerHTML={{ __html: (entry.def.ro === undefined ? "" : entry.def.ro) }} />
                        <>{this.other()}</>
                    </List.Item>
                );
            case "tr":
                if (entry.kwd.tr === undefined) {
                    return (<></>);
                }
                return (
                    <List.Item>
                        <h3>{entry.kwd.tr}</h3>
                        <div dangerouslySetInnerHTML={{ __html: (entry.def.tr === undefined ? "" : entry.def.tr) }} />
                        <>{this.other()}</>
                    </List.Item>
                );
            case "zhs":
                if (entry.kwd.zhs === undefined) {
                    return (<></>);
                }
                return (
                    <List.Item>
                        <h3>{entry.kwd.zhs}</h3>
                        <div dangerouslySetInnerHTML={{ __html: (entry.def.zhs === undefined ? "" : entry.def.zhs) }} />
                        <>{this.other()}</>
                    </List.Item>
                );
            case "zht":
                if (entry.kwd.zht === undefined) {
                    return (<></>);
                }
                return (
                    <List.Item>
                        <h3>{entry.kwd.zht}</h3>
                        <div dangerouslySetInnerHTML={{ __html: (entry.def.zht === undefined ? "" : entry.def.zht) }} />
                        <>{this.other()}</>
                    </List.Item>
                );

            default:
                return (<></>);

        }
    }
}
