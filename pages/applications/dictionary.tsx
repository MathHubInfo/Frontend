import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { Button, Container, Divider, Dropdown, DropdownProps, Input } from "semantic-ui-react";
import MHHTML from "../../src/components/MHHTML";
import getMathHubConfig from "../../src/context";
import { IGlossaryEntry, IsKnownLanguage, knownLanguages, TKnownLanguages } from "../../src/context/GlossaryClient";
import { HTML } from "../../src/context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

interface IDictionaryProps {
    initial: Partial<IDictionaryImplicits>;
}

interface IDictionaryState extends IDictionaryImplicits {
    /**
     * the string representing the currently translated object
     */
    translation: IGlossaryEntry | undefined;

    /**
     * An boolean indicating if we are currently translating
     */
    translating: boolean;

    /**
     * A boolean indiciating if the current translation is valid
     * (or undefined if no transltation attempt has been started)
     */
    translationValid: boolean | undefined;
}

interface IDictionaryImplicits {
    /**
     * The language to translation from
     */
    fromLanguage: TKnownLanguages;

    /**
     * The language to translate to
     */
    toLanguage: TKnownLanguages;

    /**
     * The text to be translated
     */
    text: string;

    // a long, human-readable description of the dictionary
    description?: HTML;
}

class Dictionary extends React.Component<IDictionaryProps & TranslateProps, IDictionaryState> {
    static implicits = new ImplicitParameters<IDictionaryImplicits>(
        { fromLanguage: "from", toLanguage: "to", text: null },
        {
            fromLanguage: ImplicitParameters.validated(IsKnownLanguage, knownLanguages[0]),
            toLanguage: ImplicitParameters.validated(IsKnownLanguage, knownLanguages[1]),
            text: ImplicitParameters.firstString(""),
        },
    );

    static async getInitialProps({ query }: NextPageContext): Promise<IDictionaryProps> {
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

    private readonly translationClient = getMathHubConfig().translationClient;

    async componentDidUpdate(_: IDictionaryProps, prevState: IDictionaryState) {
        return Dictionary.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Dictionary.implicits.setImplicits(this.state);
    }

    render() {
        const {
            t,
            initial: { description },
        } = this.props;

        const { fromLanguage, toLanguage, translating, translationValid } = this.state;

        let statusText = "";
        if (!translationValid) statusText = translating ? t("translatng") : t("press");

        return (
            <LayoutBody crumbs={[{ href: "/", title: t("home") }]} title={[t("dictionary")]}>
                <Container>
                    <h1>{t("dictionary")}</h1>
                    <ActionHeader description={description} />
                    {t("from:")}&nbsp;
                    <LanguageDropdown
                        value={fromLanguage}
                        options={knownLanguages}
                        onChange={this.changeFromLanguage}
                    />
                    &nbsp;
                    {t("to:")}&nbsp;
                    <LanguageDropdown value={toLanguage} options={knownLanguages} onChange={this.changeToLanguage} />
                    <Divider />
                    <div>
                        <Input style={{ width: "70%" }} onChange={this.changeText} />
                        <br />
                        <Button disabled={translating} onClick={this.startTranslation} style={{ marginTop: "1em" }}>
                            {t("translate")}
                        </Button>
                    </div>
                    <Divider />
                    {this.showTranslation(statusText)}
                </Container>
            </LayoutBody>
        );
    }

    private readonly changeFromLanguage = (fromLanguage: TKnownLanguages) => {
        this.setState({ fromLanguage });
    };

    private readonly changeToLanguage = (toLanguage: TKnownLanguages) => {
        this.setState({ toLanguage });
    };

    private readonly changeText = ({ target: { value: text } }: React.ChangeEvent<HTMLInputElement>, {}) => {
        this.setState(ps => ({ ...ps, text, translationValid: ps.text === text }));
    };

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
            return { ...ps, translating: true };
        });
    };

    /**
     * Runs the translation
     */
    private readonly doStartTranslation = async () => {
        const { fromLanguage, text, toLanguage } = this.state;

        // indicate that translation is currently running
        this.setState({ translating: true, translationValid: false });

        let translation: IGlossaryEntry;
        try {
            translation = await this.translationClient.translate(text, fromLanguage, toLanguage);
        } catch (e) {
            // not-implemented-hack fot now
            const keyword = "not implemented yet";
            const definition = `${text} can not be translated from ${fromLanguage} to ${toLanguage}: Unimplemented`;
            translation = {
                id: "error?error",
                kwd: {
                    en: [keyword],
                    de: [keyword],
                    zhs: [keyword],
                    fr: [keyword],
                    ro: [keyword],
                    zht: [keyword],
                    tr: [keyword],
                },
                def: {
                    en: definition,
                    de: definition,
                    zhs: definition,
                    fr: definition,
                    ro: definition,
                    zht: definition,
                    tr: definition,
                },
            };
        }

        // indicate that translation is finished (which might mean an error)
        this.setState({ translating: false, translation, translationValid: true });
    };

    private showTranslation(statusText: string) {
        const { toLanguage, translationValid, translation } = this.state;

        if (translation && translationValid) {
            const kwd = translation.kwd[toLanguage];
            const def = translation.def[toLanguage];

            return (
                <>
                    {kwd && (
                        <b>
                            <MHHTML>{kwd.join(", ")}</MHHTML>
                        </b>
                    )}
                    <div>{def && <MHHTML>{def}</MHHTML>}</div>
                </>
            );
        }

        return <div style={{ color: "grey" }}>{statusText}</div>;
    }
}

export default WithTranslate(Dictionary);

interface IDropdownProps<K extends string> {
    value: K;
    options: readonly string[];
    onChange?(k: K): void;
}

class LanguageDropdown<K extends string> extends React.Component<IDropdownProps<K>> {
    render() {
        const { options, value } = this.props;

        return (
            <Dropdown
                text={value}
                selection
                options={options.map(o => ({ text: o, value: o }))}
                onChange={this.onChange}
            />
        );
    }

    private readonly onChange = ({}, data: DropdownProps) => {
        if (this.props.onChange) this.props.onChange(data.value as K);
    };
}
