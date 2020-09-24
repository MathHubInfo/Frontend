import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import getMathHubConfig from "../../src/context";
import { IGroup } from "../../src/context/LibraryClient/objects";
import { headerProps } from "../../src/library/utils";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageArchiveRef = dynamic(() => import("../../src/theming/Pages/Library/PageArchiveRef"));
const PageGroup = dynamic(() => import("../../src/theming/Pages/Library/PageGroup"));

type IGroupProps = IDerivedParameter<IGroup>;

export default class Group extends React.Component<IGroupProps> {
  static async getInitialProps({res, query}: NextPageContext): Promise<IGroupProps> {
    return GetDerivedParameter(
        "id",
        async (id: string) => getMathHubConfig().libraryClient.getGroup(id),
        query,
        res,
    );
  }
  render() {
    const crumbs = [{href: "/", title: intl.get("home")}, {href: "/library", title: intl.get("library")}];
    if (failed(this.props)) return (
      <LayoutFailure
          crumbs={crumbs}
          statusCode={statusCode(this.props.status)}
          status={this.props.status}
      />
    );

    const { description, declarations: archives, name } = this.props.item;
    const header = <ActionHeader {...headerProps(this.props.item, {description})} />;

    return (
        <LayoutBody crumbs={crumbs} description={description} title={[name]}>
            <PageGroup header={header} item={this.props.item}>
                {archives.map(a => (
                  <PageArchiveRef
                    key={a.id}
                    item={a}
                    link={{href: "/library/archive", query: {id: a.id}}}
                  />
                ))}
            </PageGroup>
        </LayoutBody>
    );
  }
}
