import * as React from "react";
import { Container, List } from "semantic-ui-react";
import { TranslateProps, WithTranslate } from "../../../locales/WithTranslate";
import Compare from "../../../utils/Compare";
import { IActionHeaderProps } from "../../Layout/ActionHeader";
import { IGroupRefProps } from "./PageRef";

interface ILibraryProps {
    // the general information about this library page
    header: React.ReactElement<IActionHeaderProps>;

    // all the groups that are known in the library
    children: Array<React.ReactElement<IGroupRefProps>>;
}

class PageLibrary extends React.Component<ILibraryProps & TranslateProps> {
    render() {
        const { t } = this.props;
        const group = this.props.children.sort(Compare);

        return (
            <Container>
                <h1>{t("library")}</h1>
                {this.props.header}
                <List relaxed>
                    {group.map(c => (
                        <List.Item key={c.props.item.id}>{c}</List.Item>
                    ))}
                </List>
            </Container>
        );
    }
}

export default WithTranslate(PageLibrary);
