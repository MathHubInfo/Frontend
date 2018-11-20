import * as React from "react";

import { Container, Dropdown, Image, Input, Menu } from "semantic-ui-react";

import { IMathHubContext, withContext } from "../../Context";
import { Nav } from "../Common";

class Header extends React.Component<{ context: IMathHubContext }> {
    // tslint:disable-next-line:no-require-imports
    private readonly mathHubImage = require("../../../assets/logos/MathHub.svg");

    render() {
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

// tslint:disable-next-line:export-name
export default withContext(Header);
