// tslint:disable:export-name
import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import getMathHubConfig from "../../src/context";
import { IGroupRef } from "../../src/context/LibraryClient/objects";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageGroupRef = dynamic(() => import("../../src/theming/Pages/Library/PageGroupRef"));
const PageLibrary = dynamic(() => import("../../src/theming/Pages/Library/PageLibrary"));


type ILibraryProps = IDerivedParameter<IGroupRef[]>;

export default class Library extends React.Component<ILibraryProps> {
  static async getInitialProps({res, query}: NextPageContext): Promise<ILibraryProps> {
    return GetDerivedParameter(
        undefined,
        async (_: string) => getMathHubConfig().libraryClient.getGroups(),
        query,
        res,
    );
  }
  render() {
    const crumbs = [{href: "/", title: intl.get("home")}];
    if (failed(this.props)) return (
      <LayoutFailure
          crumbs={crumbs}
          statusCode={statusCode(this.props.status)}
          status={this.props.status}
      />
    );

    const title = intl.get("library");
    const description = intl.get("library intro");
    // the header for the library contains only the description
    const header = <ActionHeader description={description} />;

    return (
        <LayoutBody crumbs={crumbs} description={description} title={[title]}>
            <PageLibrary header={header}>
                {this.props.item.map(g => (
                  <PageGroupRef
                    key={g.id}
                    item={g}
                    link={{href: "/library/group", query: {id: g.id}}}
                  />
                ))}
            </PageLibrary>
        </LayoutBody>
    );
  }
}
