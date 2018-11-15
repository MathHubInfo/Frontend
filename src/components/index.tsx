import * as React from "react";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Provider } from "react-slot-fill";

import { Title } from "./fragments";
import { Body, Footer, Header } from "./layout";

import { Context, makeContext } from "../context";
import { IMathHubClientConfig, urls } from "../context/config";

import { DictToSwitch, ScrollToTop } from "./common";

import { routes, urlMaker } from "../routes";

export function MathHub(client: IMathHubClientConfig) {
    const theConfig = {client, urls};

    return (
        <Context.Provider value={makeContext(theConfig)}>
            <Title>
                <MathHubRouter BROWSER_ROUTER={client.BROWSER_ROUTER}>
                    <ScrollToTop>
                        <Provider>
                            <Header />
                            <Body />
                            <Container text style={{ marginTop: "7em" }}>
                                <DictToSwitch routes={routes} urlMaker={urlMaker} />
                            </Container>
                            <Footer />
                        </Provider>
                    </ScrollToTop>
                </MathHubRouter>
            </Title>
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
