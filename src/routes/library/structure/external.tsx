import * as React from "react";
import { IFileReference } from "../../../api";

import { Button, Icon } from "semantic-ui-react";
import { IMathHubContext, withContext } from "../../../context";

/** A button to view the source reference on GitLab */
export const SourceButton = withContext<{source: IFileReference}>
    ((props: {source: IFileReference, context: IMathHubContext}) => (
    <ExternalButton
        source={props.source}
        template={props.context.config.urls.external.gitlab}
    >
        <Icon name="code" />View Source
    </ExternalButton>
));

export const JupyterButton = withContext<{source: IFileReference}>
    ((props: {source: IFileReference, context: IMathHubContext}) => (
    <ExternalButton
        source={props.source}
        template={props.context.config.urls.external.jupyter}
    >
        <Icon name="play" />Open on JupyterHub
    </ExternalButton>
));

/** A button to an external url */
function ExternalButton(props: {
    source: IFileReference,
    template: string,
    children: null | string | React.ReactNode | React.ReactNode[],
}) {
    const {source, template, children} = props;

    const externalLink = template
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${archive}", source.parent.id)
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${branch}", "master") // for now
        // tslint:disable-next-line:no-invalid-template-strings
        .replace("${path}", source.path);

    return <Button as={"a"} size="mini" href={externalLink} target="_blank" children={children} />;
}
