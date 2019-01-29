// tslint:disable:export-name
import { NextContext } from "next";
import * as React from "react";

import { isKnownLanguage, knownLanguages, TKnownLanguages } from "../../src/context/GlossaryClient";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import { IDictionaryImplicits, IDictionaryState } from "../../src/theming/Pages/Applications/IDictionaryProps";
import PageApplicationsDictionary from "../../src/theming/Pages/Applications/PageApplicationsDictionary";

import getContext from "../../src/context";

interface IDictionaryProps {
    initial: Partial<IDictionaryImplicits>;
}

export default class Dictionary extends React.Component<IDictionaryProps, IDictionaryState> {
    static implicits = new ImplicitParameters<IDictionaryImplicits>(
        { fromLanguage: "from", toLanguage: "to", text: null },
        {
            fromLanguage: ImplicitParameters.validated(isKnownLanguage, knownLanguages[0]),
            toLanguage: ImplicitParameters.validated(isKnownLanguage, knownLanguages[1]),
            text: ImplicitParameters.firstString(""),
        },
    );

    static async getInitialProps({ query }: NextContext): Promise<IDictionaryProps> {
        return { initial: Dictionary.implicits.readImplicits(query) };
    }

    state: IDictionaryState = {
        translation: undefined,
        translating: false,
        translationValid: undefined,

        fromLanguage: knownLanguages[0],
        toLanguage: knownLanguages[1],
        text: "",

        ...this.props.initial,
    };

    private readonly translationClient = getContext().translationClient;

    async componentDidUpdate(_: IDictionaryProps, prevState: IDictionaryState) {
        return Dictionary.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Dictionary.implicits.setImplicits(this.state);
    }

    render() {
        return (
            <LayoutBody crumbs={[{href: "/", title: "Home"}]} title={["Dictionary"]}>
                <PageApplicationsDictionary
                    {...this.state}

                    knownLanguages={knownLanguages}

                    changeFromLanguage={this.changeFromLanguage}
                    changeToLanguage={this.changeToLanguage}
                    changeText={this.changeText}

                    startTranslation={this.startTranslation}
                />
            </LayoutBody>
        );
    }

    private readonly changeFromLanguage = (fromLanguage: TKnownLanguages) => {
        this.setState({ fromLanguage });
    }

    private readonly changeToLanguage = (toLanguage: TKnownLanguages) => {
        this.setState({ toLanguage });
    }

    private readonly changeText = (text: string) => {
        this.setState(ps => ({ ...ps, text, translationValid: ps.text === text }));
    }

    /**
     * Starts the translation, iff it is not blocked
     */
    private readonly startTranslation = () => {
        this.setState(ps => {
            // if p is currently translating, abort
            if (ps.translating) return ps;

            // else schedule the translation
            setImmediate(this.doStartTranslation);

            // and return the update
            return {...ps, translating: true};
        });
    }

    /**
     * Runs the translation
     */
    private readonly doStartTranslation = async () => {
        const {fromLanguage, text, toLanguage} = this.state;

        // indicate that translation is currently running
        this.setState({translating: true, translationValid: false});

        let translation: string;
        try {
            translation = await this.translationClient.translate(text, fromLanguage, toLanguage);
        } catch (e) {
            translation = e.message;
        }

        // indicate that translation is finished (which might mean an error)
        this.setState({translating: false, translation, translationValid: true });
    }
}
