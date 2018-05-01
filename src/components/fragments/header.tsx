import * as React from "react";

import { Container, Image, Menu } from "semantic-ui-react";
import { Nav } from "../../components/common/nav";

export class Header extends React.Component<{}, {}> {
    public render() {
        return (
            <Menu fixed="top">
                    <Container>
                        <Menu.Item as={Nav} exact to="/" header>
                            <Image
                                size="mini"
                                src={require("../../../assets/logos/MathHub.svg")}
                                style={{ marginRight: "1.5em" }}
                                alt="MathHub Logo"
                            />
                            MathHub
                        </Menu.Item>
                        <Menu.Item as={Nav} exact to="/about">About</Menu.Item>
                        <Menu.Item as={Nav} exact to="/legal">Legal</Menu.Item>
                    </Container>
            </Menu>
            );
        }
}
