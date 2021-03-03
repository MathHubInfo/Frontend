import dynamic from "next/dynamic";
import * as React from "react";

const LayoutFailure = dynamic(() => import("../src/theming/Layout/LayoutFailure"));

export default class Error extends React.Component {
    render() {
        return <LayoutFailure crumbs={[]} statusCode={404} />;
    }
}
