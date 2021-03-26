import React from "react";

import annotateHOC from "../utils/HOC";
import { Locale, defaultLocale } from ".";
import { translate } from "./translate";

// =====================
// Using locale
// =====================

export interface TranslateProps {
    t: (message: string, vars?: Record<string, string>) => string;
}

export function WithTranslate<P extends TranslateProps, Q extends Omit<P, keyof TranslateProps>>(
    Component: React.ComponentType<P>,
): React.ComponentType<Q> {
    return annotateHOC(
        // eslint-disable-next-line react/display-name
        class extends React.Component<Q> {
            static contextType = LocaleContext;
            context!: LocaleContextProps;
            render() {
                const t = translate.bind(undefined, this.context.localeData);

                const props = ({
                    ...this.props,
                    t: t,
                } as unknown) as P;

                return <Component {...props} />;
            }
        },
        "WithTranslate",
        Component,
    );
}

// =====================
// Getting locale
// =====================

export interface LocaleContextProps {
    locale: Locale;
    localeData: Record<string, string>;
}
export const LocaleContext = React.createContext<LocaleContextProps>({ locale: defaultLocale, localeData: {} });
