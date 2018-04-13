import * as React from 'react';

import { Nav } from "components/common/nav"
import { Container, Image, Menu } from 'semantic-ui-react'

export class Header extends React.Component<{}, {}> {
    render() {
        return <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image
                    size='mini'
                    src='/logo.png'
                    style={{ marginRight: '1.5em' }}
                    />
                    MathHub
                </Menu.Item>
                <Menu.Item as={Nav} exact to="/">Home</Menu.Item>
                <Menu.Item as={Nav} exact to="/about">About</Menu.Item>
            </Container>
    </Menu>; 
    }
}