import * as React from "react";

import { HashRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { MHTitle } from "../utils/title";

import Routes from "../routes";

import { Footer } from "./fragments/footer";
import { Header } from "./fragments/header";

import { Context, makeContext } from "../context";
import { IMathHubConfig } from "../context/config";

export class MathHub extends React.Component<IMathHubConfig, {}> {
    public render() {
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
