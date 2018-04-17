import * as React from 'react';

import { Nav } from "components/common/nav"
import { Container, Image, Menu } from 'semantic-ui-react'

export class Header extends React.Component<{}, {}> {
    render() {
        return <Menu fixed='top'>
            <Container>
                <Menu.Item as={Nav} exact to="/" header>
                    <Image size='mini' src={ require("assets/mathHubLogo.svg") } style={{ marginRight: '1.5em' }} alt="MathHub Logo" />
                    MathHub
                </Menu.Item>
                <Menu.Item as={Nav} exact to="/about">About</Menu.Item>
            </Container>
    </Menu>; 
    }
}