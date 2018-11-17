import * as React from "react";

// the parts of the page to be rendered
import Body from "./body";
import Footer from "./footer";
import Header from "./header";

export default class MathHubLayout extends React.Component {
    public render() {
        return (
            <>
                <Header />
                <Body>{this.props.children}</Body>
                <Footer />
            </>
        );
    }
}

export { BreadCrumbsFill, TextFill, TitleFill } from "./slots";
