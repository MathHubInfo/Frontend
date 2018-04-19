import * as React from "react";

import { HashRouter } from "react-router-dom"
import { Container } from 'semantic-ui-react'

import Routes from 'routes'

import {Header} from "./fragments/header"
import {Footer} from "./fragments/footer"

import {Context, makeContext} from "context"
import {MathHubConfig} from "context/config"

import DocumentTitle from "react-document-title";

export class MathHub extends React.Component<MathHubConfig, {}> {
    render() {
        return <Context.Provider value={ makeContext(this.props) }>
            <DocumentTitle title="MathHub">
                <HashRouter> 
                    <div>
                        <Header />
                        
                        <Container text style={{ marginTop: '7em' }}>
                            <Routes />
                        </Container>
                        
                        <Footer />
                    </div>
                </HashRouter>
            </DocumentTitle>
        </Context.Provider>;
    }
}