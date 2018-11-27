/**
 *  __  __       _   _     _   _       _
 * |  \/  | __ _| |_| |__ | | | |_   _| |__
 * | |\/| |/ _` | __| '_ \| |_| | | | | '_ \
 * | |  | | (_| | |_| | | |  _  | |_| | |_) |
 * |_|  |_|\__,_|\__|_| |_|_| |_|\__,_|_.__/
 *
 * (c) 2018 The KWARC Group & Contributors
 * @license GPL-3.0
 */

import { default as noticeTxt } from "./notice.txt";

// tslint:disable-next-line:no-console
console.log(noticeTxt);

// to comply with the kwarc privacy policy
// we load the banner script
const policyScript = document.createElement("script");
policyScript.setAttribute("src", "https://privacy.kwarc.info/policy.js");
policyScript.setAttribute("type", "text/javascript");
document.body.appendChild(policyScript);

// load the polyfill for older browsers
// tslint:disable-next-line:no-import-side-effect ordered-imports
import "babel-polyfill";

// tslint:disable-next-line:
Promise.all([
    // we import the modules that we directly need
    import("react"),
    import("react-dom"),
    import("./Components")
        .then(mh => mh.MathHub),

    // next we load the css, to style the page dynamically
    // tslint:disable-next-line:no-submodule-imports
    import("semantic-ui-css/semantic.min.css"),
])
.then(([ React, ReactDOM, MathHub ]) => {
    const {MMT_URL, NEWS_URL, GLOSSARY_URL, BROWSER_ROUTER} = process.env;

    ReactDOM.render(
        <MathHub
            MMT_URL={MMT_URL || ""}
            NEWS_URL={NEWS_URL || ""}
            GLOSSARY_URL={GLOSSARY_URL || ""}

            BROWSER_ROUTER={BROWSER_ROUTER || ""}
        />,
        document.getElementById("mathhub"),
    );
}).catch(e => {
    if (process.env.NODE_ENV !== "production")
        // tslint:disable-next-line:no-console
        console.error(e);
});
