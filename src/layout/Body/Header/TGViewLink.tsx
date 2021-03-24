import * as React from "react";
import { ITGViewData } from "../../../utils/URLs";

import styles from "./TGViewLink.module.css";

export default class TGViewLink extends React.Component<ITGViewData, { url: string }> {
    state = {
        url: TGViewLink.computeDefaultURL(this.props),
    };

    /**
     * Computes the URL for a TGView Link
     */
    private static computeMagicURL(data: ITGViewData): string {
        const { hostname } = window.location;

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
                return this.computeLegacyURL("http://localhost:8080", data);
            default:
                return this.computeDefaultURL(data);
        }
    }
    private static computeDefaultURL({ type, graphdata }: ITGViewData) {
        return `/applications/tgview?type=${type}&graphdata=${escape(graphdata)}`;
    }
    private static computeLegacyURL(base: string, { type, graphdata }: ITGViewData) {
        return `${base}/graphs/tgview.html?type=${type}&graphdata=${escape(graphdata)}`;
    }

    componentDidMount() {
        this.updateURL();
    }
    componentDidUpdate({ type: prevType, graphdata: prevGraphdata }: ITGViewData) {
        const { type, graphdata } = this.props;
        if (prevType !== type || prevGraphdata !== graphdata) this.updateURL();
    }

    render() {
        const { url } = this.state;
        const { children } = this.props;

        return (
            <a href={url} className={styles.link}>
                {children}
            </a>
        );
    }

    private updateURL() {
        this.setState({ url: TGViewLink.computeMagicURL(this.props) });
    }
}
