import * as React from "react";

import { HashRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { MHTitle } from "../utils/title";

import Routes from "../routes";

import { Footer } from "./fragments/footer";
import { Header } from "./fragments/header";

import { Context, makeContext } from "../context";
import { IMathHubConfig } from "../context/config";

import { ErrorText, IErrorData } from "./common/error";

export class MathHub extends React.Component<IMathHubConfig, IErrorData> {
    constructor(props: IMathHubConfig) {
        super(props);
        this.state = { hasError: false };
    }
    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({hasError: true, error, info});
    }
    public render() {
        if (this.state.hasError) {
            return <ErrorText {...this.state} />;
        }
        return (
            <Context.Provider value={makeContext(this.props)}>
                <MHTitle>
                    <HashRouter>
                        <>
                            <Header />

                            <Container text style={{ marginTop: "7em" }}>
                                <Routes />
                            </Container>

                            <Footer />
                        </>
                    </HashRouter>
                </MHTitle>
            </Context.Provider>
        );
    }
}
