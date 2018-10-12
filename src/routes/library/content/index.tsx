import * as React from "react";

import { ILibraryRouteProps } from "../structure/links";

import { IMathHubContext } from "../../../context";
import { IArchive, IGroup, IGroupRef } from "../../../context/api";

import { LibraryItem } from "..";
import { DocumentItemList } from "../narrative/documentItemList";
import { ContentItemList } from "./list";

/** The library, i.e. list of all groups */
export class Library extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getGroups = this.getGroups.bind(this);
        this.getGroupsProps = this.getGroupsProps.bind(this);
        this.getGroupsBody = this.getGroupsBody.bind(this);
    }

    private getGroups(context: IMathHubContext) { return () => context.client.getGroups(); }
    private getGroupsProps(groups: IGroupRef[]) {
        return {
            title: "Library",
            crumbs: undefined,
        };
    }
    private getGroupsBody(groups: IGroupRef[]) {
        return <ContentItemList items={groups} />;
    }

    public render() {
        return (
            <LibraryItem title="Library" promise={this.getGroups} props={this.getGroupsProps} {...this.props}>{
                this.getGroupsBody}</LibraryItem>
        );
    }
}

/** a single group */
export class Group extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.getGroupProps = this.getGroupProps.bind(this);
        this.getGroupBody = this.getGroupBody.bind(this);
    }

    private getID() { return this.props.match.params.id; }
    private getGroup(context: IMathHubContext) { return () => context.client.getGroup(this.getID()); }
    private getGroupProps(group: IGroup) {
        return {
            title: group.title,
            crumbs: group,
            statistics: group.statistics,
            description: group.description,
            responsible: group.responsible,
        };
    }
    private getGroupBody(group: IGroup) {
        return <ContentItemList items={group.archives} />;
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getGroup} props={this.getGroupProps} {...this.props}>{
                this.getGroupBody}</LibraryItem>
        );
    }
}

/** a single archive */
export class Archive extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getArchive = this.getArchive.bind(this);
        this.getArchiveProps = this.getArchiveProps.bind(this);
        this.getArchiveBody = this.getArchiveBody.bind(this);
    }

    private getID() { return this.props.match.params.id; }
    private getArchive(context: IMathHubContext) { return () => context.client.getArchive(this.getID()); }
    private getArchiveProps(archive: IArchive) {
        return {
            title: archive.title,
            crumbs: archive,
            statistics: archive.statistics,
            description: archive.description,
            responsible: archive.responsible,
        };
    }
    private getArchiveBody(archive: IArchive) {
        return <DocumentItemList nRoot={archive.narrativeRoot.decls} />;
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getArchive} props={this.getArchiveProps} {...this.props}>{
                this.getArchiveBody}</LibraryItem>
        );
    }
}
