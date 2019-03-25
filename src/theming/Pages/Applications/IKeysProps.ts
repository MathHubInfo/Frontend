export interface IKeysProps extends IKeysState {
    /**
     * The keys that are being described
     */
    keys: IKey[];

    /**
     * Ref to toggle expansion
     */
    toggleExpansion(): void;
}

export interface IKeysState {
    /**
     * Indicator if we are currently expanded
     */
    expanded: boolean;
}

/**
 * Represents a single described key
 */
export interface IKey {
    key: string;
    teaser: string;
    description: string;
}
