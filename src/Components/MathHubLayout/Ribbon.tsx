import * as React from "react";

import { IMathHubContext, withContext } from "../../Context";
import { MHRibbon } from "../Fragments";

class Ribbon extends React.Component<{context: IMathHubContext}> {
    render() {
        const { beta } = this.props.context.config.urls.help;

        if (this.props.context.config.client.SHOW_RIBBON === "beta")
            return <MHRibbon color="red" href={beta}>Beta</MHRibbon>;

        return null;
    }
}

// tslint:disable-next-line:export-name
export default withContext(Ribbon);
