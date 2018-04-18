import * as React from "react"

import { WithContext, MathHubContext } from "context"
import { PromiseComponent } from "components/common/loader"

import {Archive as ArchiveT, ArchiveID} from "context/api/omdoc"

interface ArchiveProps {
    match: {
        params: {
            group: string, 
            name: string
        }
    }
}
export const Archive = WithContext((context: MathHubContext) => class extends PromiseComponent<{context: MathHubContext} & ArchiveProps, ArchiveT>{
    private archiveID() { return this.props.match.params.group + "/" + this.props.match.params.name; }
    
    const loadingTitle = `Archive ${this.archiveID()}`;
    const errorTitle = this.loadingTitle; 

    load() {
        return this.props.context.client.getArchive(this.archiveID());
    }

    renderData(archive: ArchiveT) {

        return <div>
            The archive ID is: ${ArchiveID(archive)}
        </div>
    }
})

