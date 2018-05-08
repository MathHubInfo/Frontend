import * as React from "react";

import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
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
                        <Dropdown text="Applications" className="link item">
                            <Dropdown.Menu>
                                <Dropdown.Item as={Nav} exact to="/applications/glossary">glossary</Dropdown.Item>
                                <Dropdown.Item as={Nav} exact to="/applications/dictionary">
                                    math dictionary
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item as={Nav} exact to="/about">About</Menu.Item>
                        <Menu.Item as={Nav} exact to="/legal">Legal</Menu.Item>
                            <Dropdown text="Help" className="link item">
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Nav} exact to="/help/helpone">Example1</Dropdown.Item>
                                    <Dropdown.Item as={Nav} exact to="/help/helptwo">Example2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    </Container>
            </Menu>
            );
        }
}
