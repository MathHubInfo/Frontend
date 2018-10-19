import * as React from "react";

import { HashRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { MHTitle } from "../utils/title";

import { Footer } from "./fragments/footer";
import { Header } from "./fragments/header";

import { Context, makeContext } from "../context";
import { IMathHubClientConfig, urls } from "../context/config";

import ScrollToTop from "./common/scroll";
import DictToSwitch from "./common/urls";

import { routes, urlMaker } from "../routes";

export function MathHub(client: IMathHubClientConfig) {
    const theConfig = {client, urls};
    return (
        <Context.Provider value={makeContext(theConfig)}>
            <MHTitle>
                <HashRouter>
                    <ScrollToTop>
                        <>
                            <Header config={theConfig}/>

                            <Container text style={{ marginTop: "7em" }}>
                                <DictToSwitch routes={routes} urlMaker={urlMaker} />
                            </Container>

                            <Footer />
                        </>
                    </ScrollToTop>
                </HashRouter>
            </MHTitle>
        </Context.Provider>
    );
}
