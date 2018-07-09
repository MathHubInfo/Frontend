import * as React from "react";

import { HashRouter } from "react-router-dom";

import { Container } from "semantic-ui-react";

import { MHTitle } from "../utils/title";

import Routes from "../routes";

import { Footer } from "./fragments/footer";
import { Header } from "./fragments/header";

import { Context, makeContext } from "../context";
import { IMathHubConfig } from "../context/config";

import ScrollToTop from "../components/common/scroll";

export class MathHub extends React.Component<IMathHubConfig> {
    public render() {
        return (
            <Context.Provider value={makeContext(this.props)}>
                <MHTitle>
                    <HashRouter>
                        <ScrollToTop>
                            <>
                                <Header config={this.props}/>

                                <Container text style={{ marginTop: "7em" }}>
                                    <Routes />
                                </Container>

                                <Footer />
                            </>
                        </ScrollToTop>
                    </HashRouter>
                </MHTitle>
            </Context.Provider>
        );
    }
}
