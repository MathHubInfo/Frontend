import * as React from "react";
import { ITGViewData } from "../../utils/URLs";

export default class TGView3DLink extends React.Component<ITGViewData, { url: string }> {
    state = {
        url: TGView3DLink.computeDefaultURL(this.props),
    };

    /**
     * Computes the URL for a TGView Link
     */
    private static computeMagicURL(data: ITGViewData): string {
        const { hostname } = window.location;

        // tslint:disable-next-line: no-suspicious-comment
        // HACK HACK HACK
        // Until TGVIEW3D is ready, we hard-code the URLs to use here
        // These are based on the MathHub base URL
        switch (hostname.toLowerCase()) {
            case "mathhub.info":
            case "www.mathhub.info":
                return this.computeLegacyURL("https://mmt.mathhub.info", data);
            case "beta.mathhub.info":
                return this.computeLegacyURL("https://mmt.beta.mathhub.info", data);
            case "localhost":
                // tslint:disable-next-line: no-http-string
                return this.computeLegacyURL("http://localhost:8080", data);
            default:
                return this.computeDefaultURL(data);
        }
    }
    private static computeDefaultURL({ type, graphdata }: ITGViewData) {
        return `localhost:8080/:jgraph/json?key=${type}&uri=${escape(graphdata)}`;
    }
    private static computeLegacyURL(base: string, { type, graphdata }: ITGViewData) {
        return `${base}/:jgraph/json?key=${type}&uri=${escape(graphdata)}`;
    }

    componentDidMount() {
        this.updateURL();
    }
    componentDidUpdate({ type: prevType, graphdata: prevGraphdata }: ITGViewData) {
        const { type, graphdata } = this.props;
        if (prevType !== type || prevGraphdata !== graphdata)
            this.updateURL();
    }

    render() {
        let { url } = this.state;
        const { children } = this.props;

        // remove the protocol from the url
        // tslint:disable-next-line: no-http-string
        if (url.startsWith("http://"))
            url = url.substring(7);
        else if (url.startsWith("https://"))
            url = url.substring(8);

        // prefix the normal url
        const theURL = `https://tgview3d.mathhub.info/?${url}`;

        return <a href={theURL} style={{ color: "black" }}>{children}</a>;
    }

    private updateURL() {
        this.setState({ url: TGView3DLink.computeMagicURL(this.props) });
    }
}
