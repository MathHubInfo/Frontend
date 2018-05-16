import * as React from "react";

import { Card, Container, Divider, Header, Label } from "semantic-ui-react";
import { LoadWithPromise } from "../components/common/lazy";
import { IMathHubContext, WithContext } from "../context";

import {IArchive, IModuleItem} from "../context/api/omdoc";

import { MHTitle } from "../utils/title";

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
            <MHTitle title={this.archiveID()}>
                <LoadWithPromise
                    title={this.archiveID()}
                    promise={this.getArchive}
                    errorMessage={true}
                >{(archive: IArchive) =>
                    <div>
                        <div>
                            <Container text>
                                <Header as="h2">{archive.title}</Header>
                                <div dangerouslySetInnerHTML={{__html: archive.description}} />
                                <div>
                                    <b>Responsible:</b> {archive.responsible.map((p) => <Label key={p}>{p}</Label>)}
                                </div>
                            </Container>
                            <Divider />
                            <Container>
                                <ModuleItemList modules={archive.modules} />
                            </Container>
                        </div>
                    </div>
                }
                </LoadWithPromise>
            </MHTitle>
        );
    }
});

class ModuleItemList extends React.Component<{modules: IModuleItem[]}> {
    public render() {
        const {modules} = this.props;

        return (
            <Card.Group itemsPerRow="1">
                {modules.map((module) => <ModuleListItem key={module.name} module={module} />)}
            </Card.Group>
        );
    }
}

/** A single archive item */
class ModuleListItem extends React.Component<{module: IModuleItem}> {
    public render() {
        const {module} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {module.name}
                    </Card.Header>
                    <Card.Description>{module.name}</Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
