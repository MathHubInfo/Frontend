import * as React from "react";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-slot-fill";

import { DictToSwitch, ScrollToTop } from "./common";
import MathHubLayout from "./layout";

import { Context, IMathHubContext, makeContext, withContext } from "../context";
import { IMathHubClientConfig, urls } from "../context/config";

import { routes, urlMaker } from "../routes";

/** the main entry point for the MathHub implementation */
export function MathHub(client: IMathHubClientConfig) {
    const theConfig = {client, urls};

    return (
        <Context.Provider value={makeContext(theConfig)}>
            <MathHubRouter>
                <DictToSwitch routes={routes} urlMaker={urlMaker} />
            </MathHubRouter>
        </Context.Provider>
    );
}

/** A router component used by MathHub */
function MathHubRouter(props: {children: React.ReactElement<any>}) {
    return (
        <RouterImpl>
            <ScrollToTop>
                <Provider>
                    <MathHubLayout>
                        {props.children}
                    </MathHubLayout>
                </Provider>
            </ScrollToTop>
        </RouterImpl>
    );
}

/** The router implementation we are using */
const RouterImpl = withContext((props: {children: React.ReactElement<any>, context: IMathHubContext}) => {
    const {children, context} = props;
    const BROWSER_ROUTER = context.config.client.BROWSER_ROUTER;
    if (BROWSER_ROUTER !== "") {
        return <BrowserRouter basename={BROWSER_ROUTER} children={props.children} />;
    } else {
        return <HashRouter children={children} />;
    }
});
