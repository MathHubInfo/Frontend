import * as React from "react";
import { IFileReference } from "../../../api";
import { IMathHubContext, withContext } from "../../../context";
import { encodeLibraryLink } from "./links";

import { Nav } from "../../../components/common/nav";

import { Button } from "semantic-ui-react";

class SourceButton extends React.Component<{source: IFileReference, context: IMathHubContext}> {
    public render() {
        const source = this.props.source;
        return (
            <>
                <Button
                    as={Nav}
                    size="mini"
                    to={encodeLibraryLink(source.archive)}
                >
                    {source.archive.id}
                </Button>
                /{source.path}
            </>
    );
    }
}
export default withContext<{source: IFileReference}>(SourceButton);
