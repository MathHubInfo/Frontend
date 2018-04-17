import * as React from "react";

import { HashRouter } from "react-router-dom"
import { Container } from 'semantic-ui-react'

import Routes from 'routes'

import {Header} from "./fragments/header"
import {Footer} from "./fragments/footer"

import {Context, makeContext} from "context"
import {MathHubConfig} from "context/config"

export class MathHub extends React.Component<MathHubConfig, {}> {
    render() {
        return <Context.Provider value={ makeContext(this.props) }>  
                <HashRouter> 
                    <div>
                        <Header />
                        
                        <Container text style={{ marginTop: '7em' }}>
                            <Routes />
                        </Container>
                        
                        <Footer />
                    </div>
            </HashRouter>
        </Context.Provider>;
    }
}