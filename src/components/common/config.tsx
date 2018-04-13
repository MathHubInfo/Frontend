import * as React from "react";
import {ReactComponent} from "utils/types"

/** a configuration for MathHub */
export interface MathHubConfig { mmtURL: string; }

/** a configuration for MathHub is global */
export const ConfigContext = React.createContext<MathHubConfig>({mmtURL: "(null)"})

export function WithConfig<P>(Component: ReactComponent<P & {config: MathHubConfig}>) : ReactComponent<P> {
    return function MathHubContextConsumer(props: P) {
        return <ConfigContext.Consumer>{cfg => <Component {...props} config={cfg} />}</ConfigContext.Consumer>;
    };
}
  