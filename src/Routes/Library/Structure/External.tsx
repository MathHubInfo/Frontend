import * as React from "react";
import { Button, Icon } from "semantic-ui-react";

import { ISourceReference } from "../../../Clients/MMTClient/objects";
import { IMathHubContext, withContext } from "../../../Context";

export const SourceButton = withContext(class extends React.Component
    <{source: ISourceReference; context: IMathHubContext}> {
    render() {
        const { source, context } = this.props;

        return (
            <ExternalButton
                source={source}
                groupTemplate={context.config.urls.external.gitlabGroup}
                archiveTemplate={context.config.urls.external.gitlabArchive}
            >
                <Icon name="code" />View Source
            </ExternalButton>
        );
    }
});

export const JupyterButton = withContext(class extends React.Component
    <{source: ISourceReference; context: IMathHubContext}> {
    render() {
        const { source, context } = this.props;

        return (
            <ExternalButton
                source={source}
                groupTemplate=""
                archiveTemplate={context.config.urls.external.jupyter}
            >
                <Icon name="play" />Open on JupyterHub
            </ExternalButton>
        );
    }
});

// A button to an external url
function ExternalButton(props: {
    source: ISourceReference;
    archiveTemplate: string;
    groupTemplate: string;
    children: null | string | React.ReactNode | React.ReactNode[];
}) {
    const {source, archiveTemplate, groupTemplate, children} = props;

    let link;
    if (source.parent.kind === "group")
        link = groupTemplate
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${group}", source.parent.name);
    else
        link = archiveTemplate
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${archive}", source.parent.id)
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${branch}", source.version || "master")
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${path}", source.path || "");

    return <Button as={"a"} size="mini" href={link} target="_blank" children={children} />;
}
