import * as React from "react";

import { MHTitle } from "../Components/Fragments";
import { IRouteComponentProps } from "../Routing/makeRouteComponent";

export default class DefaultPage extends React.Component<IRouteComponentProps> {
    render() {
        return (
            <MHTitle title="Page 404" autoCrumbs>
                <div>We are sorry but the page you were looking for could not be found.</div>
            </MHTitle>
        );
    }
}
