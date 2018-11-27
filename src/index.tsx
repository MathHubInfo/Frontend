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

// load the polyfill for older browsers
// tslint:disable-next-line:no-import-side-effect ordered-imports
import "babel-polyfill";

async function main() {
    const [
        Bootstrap,
        React,
        ReactDOM,
        MathHub,
    ] = await Promise.all([
        // we want to bootstrap
        import("./Bootstrap").then(d => d.default),

        // we need to be able to use React and the dom
        import("react"),
        import("react-dom"),

        // this is the main MathHub Entry point
        import("./Components").then(mh => mh.MathHub),

        // next we load the css, to style the page dynamically
        // tslint:disable-next-line:no-submodule-imports
        import("semantic-ui-css/semantic.min.css"),
    ]);

    // run the bootstrap process
    const config = await Bootstrap(process.env.RUNTIME_CONFIG_URL || undefined);

    ReactDOM.render(
        <MathHub {...config} />,
        document.getElementById("mathhub"),
    );
}

main()
.catch(e => {
    if (process.env.NODE_ENV !== "production")
        // tslint:disable-next-line:no-console
        console.error(e);
});
