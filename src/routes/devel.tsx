import * as React from "react";

import { CreateSpinningLoader as Loader } from "../components/common/lazy";
import { MonospaceContainer } from "../components/common/monospace";

import { Context } from "../context";

import { delay } from "../utils/promises";

import { Icon, Message } from "semantic-ui-react";

export function Devel(props: {}) {
    const parser = require("html-react-parser");
    const parserOptions = {
        replace: ({ attribs, children }: any) => {
            if (!attribs) {
                return null;
            }
            if (attribs.id === "main") {
                return (
                    <h1 style={{ fontSize: 42 }}>
                        {parser.domToReact(children, parserOptions)}
                    </h1>
                );
            }
            if (attribs.id === "child") {
                return (
                    <div style={{ color: "red" }}>
                        {parser.domToReact(children, parserOptions)}
                    </div>
                );
            }
        },
    };
    return (
        <>
            This page is intended for debugging purposes only. <br />
            If you are seeing it in production, you did something wrong. <br />

            This page might also have a memory leak.
            You have been warned.

            <h2>Parser</h2>
            <div><div id="replace">Hello</div> world!</div>
            <div>=></div>
            {parser("<div><div id='replace'>Hello</div> world!</div>", {
                replace: (domNode: any) => {
                    if (domNode.attribs && domNode.attribs.id === "replace") {
                        return (<span>Hello</span>);
                    }
                },
            })}

            <div id="main">BIG<span id="child">red</span>BIG</div>
            <div>=></div>
            {parser("<div id='main'>BIG<span id='child'>red</span>BIG</div>")}

            <h2>Process.Env</h2>
            <MonospaceContainer>{JSON.stringify(process.env, undefined, 4)}</MonospaceContainer>

            <h2>Config</h2>
            <Context.Consumer>{(context) =>
                <MonospaceContainer>{JSON.stringify(context.config, undefined, 4)}</MonospaceContainer>
            }</Context.Consumer>

            <h2>Lazy Loading Tests</h2>

            <h3>Success</h3>
            This component should load.
            <Success />

            <h3>Retry (Timeout)</h3>
            This component should load after the retry button is pressed.
            <Retry />

            <h3>Promise Rejection</h3>
            This component should fail to load after a couple seconds because of promise rejection.
            <Rejection />

            <h3>Fatal Error</h3>
            This component should fail to load because of a fatal error almost immediatly.
            <Fatal />
        </>
    );
}

const loadTimeDelay = 5000;

const Success = Loader("Success Test", () => delay(Promise.resolve(DummyShouldLoad), loadTimeDelay));

const Fatal = Loader("Fatal", () => new Promise<React.SFC<{}>>((reject, resolve) => {
    throw new Error("Intended Failure");
}));

const Rejection = Loader({
    title: "Rejection",
    errorTitle: "Loading has been rejected as intended",
    errorMessage: true,
}, () =>
        delay(Promise.reject<React.SFC<{}>>("Nothing to worry about. "), loadTimeDelay));

let hasTriedBefore = false;
const Retry = Loader("Retry", () => {
    hasTriedBefore = !hasTriedBefore; // flip it if we load again
    if (!hasTriedBefore) {
        return delay(Promise.resolve(DummyShouldLoad), loadTimeDelay);
    } else {
        return new Promise<React.SFC<{}>>((reject, resolve) => null);
    }
});

function DummyShouldLoad(props: {}) {
    return (
        <Message success icon>
            <Icon name="check" />
            <Message.Content>
                <Message.Header>Dummy Component</Message.Header>
                The dummy component has been loaded as intended.
            </Message.Content>
        </Message>
    );
}
