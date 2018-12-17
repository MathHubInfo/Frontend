import * as React from "react";

import { DerivedDataStatus } from "../../../utils/getDerivedParameter";

import { ILayoutFailureProps } from "../../../theming/Layout/ILayoutFailureProps";
import LayoutBody from "../../../theming/Layout/LayoutBody";


export default class LayoutFailure extends React.Component<ILayoutFailureProps> {
    render() {
        const {status, statusCode, crumbs} = this.props;

        let title = "Not Found";
        if (status === DerivedDataStatus.MISSING_VALUE) title = "Missing URL parameter";
        else if (statusCode === 500 || status === DerivedDataStatus.ERROR_DERIVATION) title = "Something went wrong";

        return <LayoutBody crumbs={crumbs} title={[title]}><>HTTP {statusCode}: {title}</></LayoutBody>;
    }
}
