import * as React from "react";

import { Container, Divider, Header, Label } from "semantic-ui-react";
import { LoadWithSpinner } from "../../components/common/lazy";

import { IMathHubContext, WithContext } from "../../context";
import { IArchive } from "../../context/api";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, ILibraryRouteProps } from "./";
import { DocumentItemList } from "./DocumentItemList";

export const Archive = WithContext((context: IMathHubContext) => class extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getArchive = this.getArchive.bind(this);
    }

    private archiveID() { return decodeLibraryLinkID(this.props.match.params.id); }
    private getArchive() { return context.client.getArchive(this.archiveID()); }

    public render() {
        return (
            <MHTitle title={this.archiveID()}>
                <LoadWithSpinner
                    title={this.archiveID()}
                    promise={this.getArchive}
                    errorMessage={true}
                >{(archive: IArchive) =>
                    <>
                        <>
                            <MHRefBreadCrumbs to={archive} />
                            <>
                                <Header as="h2">
                                    <div dangerouslySetInnerHTML={{__html: archive.title}} />
                                </Header>
                                <div dangerouslySetInnerHTML={{__html: archive.description}} />
                                <>
                                    <b>Responsible:</b> {archive.responsible.map((p) => <Label key={p}>{p}</Label>)}
                                </>
                            </>
                            <Divider />
                            <Container>{
                                <DocumentItemList nRoot={archive.narrativeRoot.decls} />}
                            </Container>
                        </>
                    </>
                }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});
