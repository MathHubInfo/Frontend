import nProgress from "nprogress";
import * as React from "react";
import styles from "./LayoutRoutingIndicator.module.css";

const template = `<div class="${styles.nprogress}"><div class="${styles.bar}" role="bar"><div class="peg"></div></div><div class="${styles.spinner}" role="spinner"><div class="${styles.spinnerIcon}></div></div></div>`;

export default class LayoutRoutingIndicator extends React.Component {
    componentDidMount() {
        nProgress.configure({ template });
        nProgress.start();
    }
    componentWillUnmount() {
        nProgress.done();
    }
    render() {
        return null;
    }
}
