import * as React from "react";

import Error from "./_error";

export default class Error404 extends React.Component {
    render() {
        return <Error statusCode={404} />;
    }
}
