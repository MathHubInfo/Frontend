import * as React from "react";
import { Container } from "semantic-ui-react";
import { TranslateProps, WithTranslate } from "../../../locales/WithTranslate";

interface INoticesProps {
    /**
     * the legal text of required notices
     */
    notices: string | undefined;

    /**
     * The MathHub License Text
     */
    license: string;
}

class PageLegalNotices extends React.Component<INoticesProps & TranslateProps> {
    render() {
        const { t, license, notices } = this.props;
        return (
            <Container>
                <h2>{t("license")}</h2>
                <pre>{license}</pre>
                <h2>{t("notices")}</h2>
                <pre>{notices}</pre>
            </Container>
        );
    }
}

export default WithTranslate(PageLegalNotices);
