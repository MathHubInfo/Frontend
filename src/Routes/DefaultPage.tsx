import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { MHTitle } from "../Components/Fragments";

export class DefaultPage extends React.Component<RouteComponentProps> {
    render() {
        return (
            <MHTitle title="Page 404" autoCrumbs>
                <div>We are sorry but the page you were looking for could not be found.</div>
            </MHTitle>
        );
    }
}
