// tslint:disable:export-name
import { NextContext } from "next";
import * as React from "react";
import intl from "react-intl-universal";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import LayoutFailure from "../../src/theming/Layout/LayoutFailure";

import { IGroupRef } from "../../src/context/LibraryClient/objects";

import getDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/getDerivedParameter";

import getContext from "../../src/context";
import PageLibrary from "../../src/theming/Pages/Library/PageLibrary";

import ActionHeader from "../../src/theming/Layout/ActionHeader";
import PageGroupRef from "../../src/theming/Pages/Library/PageGroupRef";

type ILibraryProps = IDerivedParameter<IGroupRef[]>;

export default class Library extends React.Component<ILibraryProps> {
  static async getInitialProps({res, query}: NextContext): Promise<ILibraryProps> {
    return getDerivedParameter(
        undefined,
        async (_: string) => getContext().libraryClient.getGroups(),
        query,
        res,
    );
  }
  static crumbs = [{href: "/", title: "Home"}];
  render() {
    if (failed(this.props)) return (
      <LayoutFailure
          crumbs={Library.crumbs}
          statusCode={statusCode(this.props.status)}
          status={this.props.status}
      />
    );

    const description = intl.get("library intro");
    // the header for the library contains only the description
    const header = <ActionHeader description={description} />;

    return (
        <LayoutBody crumbs={Library.crumbs} description={description} title={["Library"]}>
            <PageLibrary header={header}>
                {this.props.item.map(g => <PageGroupRef
                    key={g.id}
                    item={g}
                    link={{href: "/library/group", query: {id: g.id}}}
                />)}
            </PageLibrary>
        </LayoutBody>
    );
  }
}
