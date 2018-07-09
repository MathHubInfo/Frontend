import * as React from "react";

import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Nav } from "../../components/common/nav";
import { IMathHubConfig } from "../../context/config";

export class Header extends React.Component<{config: IMathHubConfig}, {}> {
    public render() {
        const {config} = this.props;
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
                        <Dropdown text="Help" className="link item">
                            <Dropdown.Menu>
                                <Dropdown.Item href={config.ADMIN_URL}>
                                    Documentation
                                </Dropdown.Item>
                                <Dropdown.Item href={"https://gl.mathhub.info/"}>
                                    Browse Sources
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href={"http://lists.informatik.uni-erlangen.de/mailman/listinfo/mathhub"}
                                >
                                    Contact a Human
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item href={"http://new.mathhub.info/admin/"}>
                            Admin
                        </Menu.Item>
                        <Menu.Item href={"https://github.com/MathHubInfo/Documentation/wiki/about"}>
                            About
                        </Menu.Item>
                    </Container>
            </Menu>
            );
        }
}
