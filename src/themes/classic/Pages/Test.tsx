import * as React from "react";
import intl from "react-intl-universal";
import { Container } from "semantic-ui-react";
import Axios from "axios";


export default class Test extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
    }
    state = { initDone: false };

    async componentDidMount() {
        await this.loadLocales();
    }
    async loadLocales() {
        const currentLocale = "en";

        await Axios
            .get(`../../../locales/${currentLocale}.json`)
            .then(async res => {
                // init method will load CLDR locale data according to currentLocale
                return intl.init({
                    currentLocale,
                    locales: {
                        [currentLocale]: res.data,
                    },
                });
            })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }

    render() {
        return (
            this.state.initDone &&
            (
            <Container>
                <h1>This Page exists only for testing purposes</h1>
                {intl.get("TEST")}
            </Container>
            )
        );
    }
}
