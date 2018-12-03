import * as React from "react";
import { Icon, Message } from "semantic-ui-react";

import { Monospace } from "../Components/Common";
import { HTML, MHText, MHTitle } from "../Components/Fragments";
import { CreateSpinningLoader as Loader } from "../Components/Loaders";
import { Context } from "../Context";
import { IRouteComponentProps } from "../Routing/makeRouteComponent";
import { delay } from "../Utils/promises";

export default class Devel extends React.Component<IRouteComponentProps> {
    render() {
        return (
            <MHTitle title="Devel" autoCrumbs>
                <MHText>
                    This page is intended for debugging purposes only. <br />
                    If you are seeing it in production, you did something wrong. <br />

                    This page might also have a memory leak.
                    You have been warned. <br />
                </MHText>

                <h2>Process.Env</h2>
                <Monospace>{JSON.stringify(process.env, undefined, 4)}</Monospace>

                <h2>Config</h2>
                <Context.Consumer>{context =>
                    <Monospace>{JSON.stringify(context.config, undefined, 4)}</Monospace>
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

                <h2>Math</h2>
                <SampleMath />
            </MHTitle>
        );
    }
}

function SampleMath() {
    // tslint:disable-next-line:max-line-length
    const theMath = "<math xmlns='http://www.w3.org/1998/Math/MathML'><mrow><msub><mi>a</mi><mrow><mn>1</mn></mrow></msub><mo>+</mo><msub><mi>b</mi><mrow><mn>1</mn></mrow></msub></mrow></math>";

    return <HTML>{theMath}</HTML>;
}

const loadTimeDelay = 5000;

const Success = Loader("Success Test", async () => delay(Promise.resolve(DummyShouldLoad), loadTimeDelay));

const Fatal = Loader("Fatal", async () => {
    throw new Error("Inended Failure");
});

const Rejection = Loader<{}>(
    {
        title: "Rejection",
        errorTitle: "Loading has been rejected as intended",
        errorMessage: true,
    },
    async () => delay(Promise.reject("Nothing to worry about. "), loadTimeDelay),
);

let hasTriedBefore = false;
const Retry = Loader("Retry", async () => {
    hasTriedBefore = !hasTriedBefore; // flip it if we load again
    if (!hasTriedBefore)
        return delay(Promise.resolve(DummyShouldLoad), loadTimeDelay);
    else
        return new Promise<React.ComponentClass>((reject, resolve) => null);
});

class DummyShouldLoad extends React.Component {
    render() {
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
}
