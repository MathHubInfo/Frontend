import * as React from "react";
import { BrowserRouter, HashRouter, StaticRouter } from "react-router-dom";
import { Provider } from "react-slot-fill";

import { Context, IMathHubContext, makeContext, withContext } from "../Context";
import { IMathHubClientConfig, urls } from "../Context/config";
import { default as routes } from "../Routes";
import { makeReactLibraryRoute } from "../Routes/Library/Structure/Links";

import { DictToSwitch, ScrollToTop } from "./Common";
import MathHubLayout, { Ribbon } from "./MathHubLayout";

// the main entry point for MathHub
// tslint:disable-next-line:export-name
export function MathHub(client: IMathHubClientConfig) {
    const theConfig = {client, urls};

    return (
        <Context.Provider value={makeContext(theConfig)}>
            <>
                <Ribbon />
                <MathHubRouter>
                    <DictToSwitch routes={routes} urlMaker={makeReactLibraryRoute} />
                </MathHubRouter>
            </>
        </Context.Provider>
    );
}

// A router component used by MathHub
function MathHubRouter(props: {children: React.ReactChild}) {
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

// The router implementation we are using
const RouterImpl = withContext(class extends React.Component<{context: IMathHubContext}> {
    render() {
        const {children, context} = this.props;
        const {BROWSER_ROUTER, SERVER_ROUTER} = context.config.client;
        if (BROWSER_ROUTER !== "")
            return <BrowserRouter basename={BROWSER_ROUTER} children={children} />;
        else if (SERVER_ROUTER !== "")
            return <StaticRouter location={SERVER_ROUTER} context={{}} children={children} />;
        else
            return <HashRouter children={children} />;
    }
});
