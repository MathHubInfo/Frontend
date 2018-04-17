import * as React from "react"

export class Group extends React.Component<{match: {params: {name: string}}}> {
    render() {
        return <div>
            {this.props.match.params.name }
        </div>
    }
}