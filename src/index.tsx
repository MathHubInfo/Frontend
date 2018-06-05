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

// loading nice CSS
// tslint:disable-next-line:no-submodule-imports
import "semantic-ui-css/semantic.min.css";

Promise.all([
    import("react"),
    import("react-dom"),

    import("./components").then((mh) => mh.MathHub),
]).then(([
    React,
    ReactDOM,
    MathHub,
]) => {
    ReactDOM.render(
        <MathHub mockMMT={!!process.env.MOCK_MMT} mmtURL={process.env.MMT_URL || "http://localhost:9000/:mathhub/"} />,
        document.getElementById("mathhub"),
    );
});
