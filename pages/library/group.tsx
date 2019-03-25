import { NextContext } from "next";
import * as React from "react";

import getDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/getDerivedParameter";

import getContext from "../../src/context";
import { IGroup } from "../../src/context/LibraryClient/objects";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import LayoutFailure from "../../src/theming/Layout/LayoutFailure";
import LibraryItemHeader from "../../src/theming/Layout/LibraryItemHeader";
import PageArchiveRef from "../../src/theming/Pages/Library/PageArchiveRef";
import PageGroup from "../../src/theming/Pages/Library/PageGroup";

import { headerProps } from "../../src/lib/library/utils";

type IGroupProps = IDerivedParameter<IGroup>;

export default class Group extends React.Component<IGroupProps> {
  static async getInitialProps({res, query}: NextContext): Promise<IGroupProps> {
    return getDerivedParameter(
        "id",
        async (id: string) => getContext().libraryClient.getGroup(id),
        query,
        res,
    );
  }
  static crumbs = [{href: "/", title: "Home"}, {href: "/library", title: "Library"}];
  render() {
    if (failed(this.props)) return (
      <LayoutFailure
          crumbs={Group.crumbs}
          statusCode={statusCode(this.props.status)}
          status={this.props.status}
      />
    );

    const { description, declarations: archives, name } = this.props.item;
    const header = <LibraryItemHeader {...headerProps(this.props.item, {description})} />;

    return (
        <LayoutBody crumbs={Group.crumbs} description={description} title={[name]}>
            <PageGroup header={header} item={this.props.item}>
                {archives.map(a => <PageArchiveRef
                    key={a.id}
                    item={a}
                    link={{href: "/library/archive", query: {id: a.id}}}
                />)}
            </PageGroup>
        </LayoutBody>
    );
  }
}
