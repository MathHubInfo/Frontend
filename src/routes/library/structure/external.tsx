import * as React from "react";
import { ISourceReference } from "../../../api";

import { Button, Icon } from "semantic-ui-react";
import { IMathHubContext, withContext } from "../../../context";

/** A button to view the source reference on GitLab */
export const SourceButton = withContext<{source: ISourceReference}>
    ((props: {source: ISourceReference, context: IMathHubContext}) => (
    <ExternalButton
        source={props.source}
        groupTemplate={props.context.config.urls.external.gitlabGroup}
        archiveTemplate={props.context.config.urls.external.gitlabArchive}
    >
        <Icon name="code" />View Source
    </ExternalButton>
));

export const JupyterButton = withContext<{source: ISourceReference}>
    ((props: {source: ISourceReference, context: IMathHubContext}) => (
    <ExternalButton
        source={props.source}
        groupTemplate=""
        archiveTemplate={props.context.config.urls.external.jupyter}
    >
        <Icon name="play" />Open on JupyterHub
    </ExternalButton>
));

/** A button to an external url */
function ExternalButton(props: {
    source: ISourceReference,
    archiveTemplate: string,
    groupTemplate: string,
    children: null | string | React.ReactNode | React.ReactNode[],
}) {
    const {source, archiveTemplate, groupTemplate, children} = props;

    let link;
    if (source.parent.kind === "group") {
        link = groupTemplate
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${group}", source.parent.name);
    } else {
        link = archiveTemplate
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${archive}", source.parent.id)
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${branch}", source.version || "master")
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${path}", source.path || "");
    }

    return <Button as={"a"} size="mini" href={link} target="_blank" children={children} />;
}
