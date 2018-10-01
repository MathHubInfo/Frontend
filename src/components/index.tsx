import * as React from "react";

import { HashRouter } from "react-router-dom";

import { Container } from "semantic-ui-react";

import { MHTitle } from "../utils/title";

import Routes from "../routes";

import { Footer } from "./fragments/footer";
import { Header } from "./fragments/header";

import { Context, makeContext } from "../context";
import { IMathHubClientConfig, urls } from "../context/config";

import ScrollToTop from "../components/common/scroll";

export class MathHub extends React.Component<IMathHubClientConfig> {
    public render() {
        const theConfig = {client: this.props, urls};
        return (
            <Context.Provider value={makeContext(theConfig)}>
                <MHTitle>
                    <HashRouter>
                        <ScrollToTop>
                            <>
                                <Header config={theConfig}/>

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
