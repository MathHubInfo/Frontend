import * as React from "react"

import { WithContext, MathHubContext } from "context"
import { LoadWithPromise } from "components/common/lazy"

import {Archive as ArchiveT, ArchiveID} from "context/api/omdoc"

interface ArchiveProps {
    match: {
        params: {
            group: string, 
            name: string
        }
    }
}

export const Archive = WithContext((context: MathHubContext) => class extends React.Component<ArchiveProps> {
    private archiveID() { return this.props.match.params.group + "/" + this.props.match.params.name; }

    render() {
        return <LoadWithPromise title={`Archive ${this.archiveID()}`} promise={() => context.client.getArchive(this.archiveID())}>{
            (archive: ArchiveT) => <div>
                The archive ID is: ${ArchiveID(archive)}
            </div>
        }</LoadWithPromise>
    }
});
