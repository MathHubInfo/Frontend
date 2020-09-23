import * as React from "react";
import { Container, List } from "semantic-ui-react";
import MHHTML from "../../../lib/components/MHHTML";
import Compare from "../../../utils/Compare";

import { IActionHeaderProps } from "../../Layout/ActionHeader";

import { IGroup } from "../../../context/LibraryClient/objects";
import { IArchiveRefProps } from "./PageArchiveRef";

interface IGroupProps {
    // the general information about this library page
    header: React.ReactElement<IActionHeaderProps>;

    // the group being rederned
    item: IGroup;

    // all the groups that are known in the library
    children: Array<React.ReactElement<IArchiveRefProps>>;
}



export default class PageGroup extends React.Component<IGroupProps> {
    render() {
        const archives = this.props.children.sort(Compare);

        return (
            <Container>
                <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                {this.props.header}
                <List relaxed>
                    {archives.map(c => <List.Item key={c.props.item.id}>{c}</List.Item>)}
                </List>
            </Container>
        );
    }
}
