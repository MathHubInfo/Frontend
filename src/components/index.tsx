import * as React from "react";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { MHTitle } from "../utils/title";

import { Footer, Header } from "./fragments";

import { Context, makeContext } from "../context";
import { IMathHubClientConfig, urls } from "../context/config";

import { DictToSwitch, ScrollToTop } from "./common";

import { routes, urlMaker } from "../routes";

export function MathHub(client: IMathHubClientConfig) {
    const theConfig = {client, urls};

    return (
        <Context.Provider value={makeContext(theConfig)}>
            <MHTitle>
                <MathHubRouter BROWSER_ROUTER={client.BROWSER_ROUTER}>
                    <ScrollToTop>
                        <>
                            <Header config={theConfig}/>

                            <Container text style={{ marginTop: "7em" }}>
                                <DictToSwitch routes={routes} urlMaker={urlMaker} />
                            </Container>

                            <Footer />
                        </>
                    </ScrollToTop>
                </MathHubRouter>
            </MHTitle>
        </Context.Provider>
    );
}

function MathHubRouter(props: {children: React.ReactElement<any>, BROWSER_ROUTER: string}) {
    const {children, BROWSER_ROUTER} = props;
    if (BROWSER_ROUTER !== "") {
        return <BrowserRouter basename={BROWSER_ROUTER} children={props.children} />;
    } else {
        return <HashRouter children={children} />;
    }
}
