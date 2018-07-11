import * as React from "react";

import { Button, Table } from "semantic-ui-react";

export class Keys extends React.Component<{}> {
    public state = { more: false, text: "more" };

    private handleClick = () =>
        this.setState({
            more: !this.state.more,
            text: this.state.text === "more" ? "less" : "more",
        })

    public render() {
        return (
            <>
                <Button onClick={this.handleClick}>show {this.state.text}</Button>
                <Table>
                    <Table.Row active>
                            <Table.Cell width={3}><b>key</b></Table.Cell>
                            <Table.Cell><b>description</b></Table.Cell>
                    </Table.Row>
                        <Content more={this.state.more} />
                </Table>
            </>
        );
    }
}

class Content extends React.Component<{ more: boolean }> {
    public render() {
        const { more } = this.props;

        if (more) {
            return (
                <>
                    <Table.Row>
                        <Table.Cell>decl</Table.Cell>
                        <Table.Cell>
                            Declarations declared (possibly via multiple hops)
                            by the given theory/document/archive
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>exp</Table.Cell>
                        <Table.Cell>
                            Declarations induced via (possibly multiple concatenated)
                            explicit theory morphisms (aka. views)
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>any</Table.Cell>
                        <Table.Cell>
                            Declarations induced via any (possibly multiple concatenated)
                            theory morphisms (views, includes, metas andimplicit morphisms)
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>align</Table.Cell>
                        <Table.Cell>
                            Declarations aligned (possibly via multiple intermediate alignments)
                            with declaration declared by the giventheory/document/archive
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>theo</Table.Cell>
                        <Table.Cell>
                            theory
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>doc</Table.Cell>
                        <Table.Cell>
                            document
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>unty_con</Table.Cell>
                        <Table.Cell>
                            declaration of untyped constant
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>ty_con</Table.Cell>
                        <Table.Cell>
                            declaration of typed constant
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>mal_con</Table.Cell>
                        <Table.Cell>
                            maltyped (type can't be infered) constant declaration
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>struc</Table.Cell>
                        <Table.Cell>
                            structure
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>pat</Table.Cell>
                        <Table.Cell>
                            pattern
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>judg</Table.Cell>
                        <Table.Cell>
                            judgement constructor
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>data</Table.Cell>
                        <Table.Cell>
                            data constructor
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>type</Table.Cell>
                        <Table.Cell>
                            datatype constructor
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>rule</Table.Cell>
                        <Table.Cell>
                            rule declarations
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>view</Table.Cell>
                        <Table.Cell>
                            views in the theory
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>high</Table.Cell>
                        <Table.Cell>
                            constructors returning kinds or object in even higher typing universes
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>exp_mor</Table.Cell>
                        <Table.Cell>
                            the transitive closure of all theory morphisms into the theory
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>any_mor</Table.Cell>
                        <Table.Cell>
                            the transitive closure of all theory morphisms into the theory
                    </Table.Cell>
                    </Table.Row>
                </>
            );
        } else {
            return (
                <>
                    <Table.Row>
                        <Table.Cell>decl</Table.Cell>
                        <Table.Cell>
                            Declared declaration
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>exp</Table.Cell>
                        <Table.Cell>
                            Induced declaration by explicit morphisms (views)
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>any</Table.Cell>
                        <Table.Cell>
                            Induced declaration by any morphisms
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>align</Table.Cell>
                        <Table.Cell>
                            Alignment
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>theo</Table.Cell>
                        <Table.Cell>
                            theory
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>doc</Table.Cell>
                        <Table.Cell>
                            document
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>unty_con</Table.Cell>
                        <Table.Cell>
                            untyped constant
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>ty_con</Table.Cell>
                        <Table.Cell>
                            typed constant
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>mal_con</Table.Cell>
                        <Table.Cell>
                            maltyped constant
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>struc</Table.Cell>
                        <Table.Cell>
                            structure
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>pat</Table.Cell>
                        <Table.Cell>
                            pattern
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>judg</Table.Cell>
                        <Table.Cell>
                            judgement constructor
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>data</Table.Cell>
                        <Table.Cell>
                            data constructor
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>type</Table.Cell>
                        <Table.Cell>
                            datatype constructor
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>rule</Table.Cell>
                        <Table.Cell>
                            rule
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>view</Table.Cell>
                        <Table.Cell>
                            view
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>high</Table.Cell>
                        <Table.Cell>
                            high universe
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>exp_mor</Table.Cell>
                        <Table.Cell>
                            explicit theory morphism
                    </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>any_mor</Table.Cell>
                        <Table.Cell>
                            any theory morphism
                    </Table.Cell>
                    </Table.Row>
                </>
            );
        }
    }
}
