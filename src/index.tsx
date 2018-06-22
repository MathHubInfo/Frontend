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

import notice from "./notice.txt";

// tslint:disable-next-line:no-console
console.log(notice);

// to comply with the kwarc privacy policy
// we load the banner script
const policyScript = document.createElement("script");
policyScript.setAttribute("src", "https://privacy.kwarc.info/policy.js");
policyScript.setAttribute("type", "text/javascript");
document.body.appendChild(policyScript);

// load the polyfill for older browsers
import "babel-polyfill";

Promise.all([
    // we import the modules that we directly need
    import(/* webpackChunkName: "react" */"react"),
    import(/* webpackChunkName: "react" */"react-dom"),
    import(/* webpackChunkName: "app" */"./components").then((mh) => mh.MathHub),

    // next we load the css, to style the page dynamically
    // tslint:disable-next-line:no-submodule-imports
    import(/* webpackChunkName: "semantic_ui_css" */"semantic-ui-css/semantic.min.css"),
]).then(([ React, ReactDOM, MathHub ]) => {
    ReactDOM.render(
        <MathHub
            MOCK_MMT={process.env.MOCK_MMT === "true"}
            MMT_URL={process.env.MMT_URL!}
            ADMIN_URL={process.env.ADMIN_URL!}
        />,
        document.getElementById("mathhub"),
    );
});
