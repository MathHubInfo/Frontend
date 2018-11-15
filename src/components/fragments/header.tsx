import * as React from "react";

import { Container, Dropdown, Image, Input, Menu } from "semantic-ui-react";

import { Nav } from "../../components/common";
import { IMathHubContext, withContext } from "../../context";

class Header extends React.Component<{ context: IMathHubContext }, {}> {
    private mathHubImage = require("../../../assets/logos/MathHub.svg");

    public render() {
        const { config } = this.props.context;
        return (
            <Menu fixed="top">
                <Container>
                    <Menu.Item as={Nav} exact to="/" header>
                        <Image
                            size="mini"
                            src={this.mathHubImage}
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
                            <Dropdown.Item href={config.urls.help.documentation}>
                                Documentation
                            </Dropdown.Item>
                            <Dropdown.Item href={config.urls.help.browseSources}>
                                Browse Sources
                            </Dropdown.Item>
                            <Dropdown.Item
                                href={config.urls.help.contactAHuman}
                            >
                                Contact a Human
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item as={Nav} exact to="/news">
                        News
                    </Menu.Item>
                    <Menu.Item href={config.urls.admin}>
                        Admin
                    </Menu.Item>
                    <Menu.Item href={config.urls.about}>
                        About
                    </Menu.Item>
                    <Menu.Menu position={"right"}>
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..." />
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

export default withContext(Header);
