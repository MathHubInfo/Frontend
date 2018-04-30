import * as React from "react";

import { LoadWithPromise } from "../components/common/lazy";
import { IMathHubContext, WithContext } from "../context";

import {ArchiveID, IArchive} from "../context/api/omdoc";

import DocumentTitle from "react-document-title";

interface IArchiveProps {
    match: {
        params: {
            group: string,
            name: string,
        },
    };
}

export const Archive = WithContext((context: IMathHubContext) => class extends React.Component<IArchiveProps> {
    constructor(props: IArchiveProps) {
        super(props);
        this.getArchive = this.getArchive.bind(this);
    }

    private archiveID() { return this.props.match.params.group + "/" + this.props.match.params.name; }
    private getArchive() { return context.client.getArchive(this.archiveID()); }

    public render() {
        return (
            <DocumentTitle title={`${this.archiveID()} | MathHub`}>
                <LoadWithPromise
                    title={this.archiveID()}
                    promise={this.getArchive}
                    errorMessage={true}
                >{(archive: IArchive) =>
                    <div>
                        The archive ID is: ${ArchiveID(archive)}
                    </div>
                }
                </LoadWithPromise>
            </DocumentTitle>
        );
    }
});
