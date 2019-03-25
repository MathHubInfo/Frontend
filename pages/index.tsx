// tslint:disable:export-name
import { NextContext } from "next";
import * as React from "react";

import getDerivedParameter, { failed, IDerivedParameter, statusCode } from "../src/utils/getDerivedParameter";

import LayoutBody from "../src/theming/Layout/LayoutBody";
import LayoutFailure from "../src/theming/Layout/LayoutFailure";
import PageHome from "../src/theming/Pages/PageHome";

type IHomeProps = IDerivedParameter<string>;

export default class Home extends React.Component<IHomeProps> {
  static async getInitialProps({res, query}: NextContext): Promise<IHomeProps> {
    return getDerivedParameter(
        undefined,
        async (_: string) => (await import("../src/assets/home.txt")).default,
        query,
        res,
    );
  }
  static crumbs = [];
  render() {
    if (failed(this.props)) return (
      <LayoutFailure
          crumbs={Home.crumbs}
          statusCode={statusCode(this.props.status)}
          status={this.props.status}
      />
    );

    return (
      <LayoutBody crumbs={Home.crumbs} title={["Home"]} description={this.props.item}>
        <PageHome>{this.props.item}</PageHome>
      </LayoutBody>
    );
  }
}
