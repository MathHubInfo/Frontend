import * as React from "react";

import { Card, Container, Divider } from "semantic-ui-react";

import { Nav } from "../components/common/nav";

export class Home extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <Container text>
                    Something something home
                </Container>
                <Divider />
                <Container>
                    <Card>
                        <Card.Content>
                            <Card.Header as={Nav} to={`/content`} >
                                <div>
                                    <p>Library</p>
                                </div>
                            </Card.Header>
                            <Card.Description>
                                <div>
                                    <p>The library can be found here</p>
                                </div>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Container>
            </div>
        );
    }
}
