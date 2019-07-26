// tslint:disable:export-name

import { NextPageContext } from "next";
import * as React from "react";

import { Indexable } from "../src/types/lib";

import LayoutFailure from "../src/theming/Layout/LayoutFailure";

interface IErrorProps {
  statusCode?: number;
}

export default class Error extends React.Component<IErrorProps> {
  static async getInitialProps({ res, err }: NextPageContext): Promise<IErrorProps> {
    const statusCode = res ? res.statusCode : err ? (err as Indexable<Error>).statusCode : null;

    return { statusCode };
  }

  render() {
    return <LayoutFailure crumbs={[]} statusCode={this.props.statusCode || 404} />;
  }
}

