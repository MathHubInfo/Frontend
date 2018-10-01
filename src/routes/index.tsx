
import * as React from "react";

import { Route, Switch } from "react-router-dom";

import { CreateSpinningLoader as Loader } from "../components/common/lazy";

// #region "Loading Modules"
const Home = Loader("Home Page", () =>
    import(/* webpackChunkName: "home"*/"./home").then((h) => h.Home));

import { makeLibraryRouteSpec } from "./library";
const Library = Loader("Library", () =>
    import(/* webpackChunkName: "library"*/"./library/library").then((l) => l.Libray));
const Group = Loader("Group", () =>
    import(/* webpackChunkName: "library_group"*/"./library/group").then((g) => g.Group));
const Archive = Loader("Archive", () =>
    import(/* webpackChunkName: "library_archive"*/"./library/archive").then((a) => a.Archive));
const Document = Loader("Document", () =>
    import(/* webpackChunkName: "library_document"*/"./library/document").then((d) => d.Document));
const Notebook = Loader("Notebook", () =>
    import(/* webpackChunkName: "library_document"*/"./library/notebook").then((n) => n.Notebook));

const Glossary = Loader("Glossary", () =>
    import(/* webpackChunkName: "applications_glossary"*/"./applications/glossary").then((g) => g.Glossary));
const Dictionary = Loader("Dictionary", () =>
    import(/* webpackChunkName: "applications_dictionary"*/"./applications/dictionary").then((d) => d.Dictionary));
const Keys = Loader("Keys", () =>
import(/* webpackChunkName: "applications_glossary"*/"./applications/keys").then((k) => k.Keys));

const Licenses = Loader("Legal", () =>
    import(/* webpackChunkName: "legal"*/"./legal/licenses").then((l) => l.Licenses));
const Imprint = Loader("Imprint", () =>
    import(/* webpackChunkName: "imprint"*/"./legal/imprint").then((i) => i.Imprint));

// for testing only, we have a debug route
const Devel = process.env.NODE_ENV === "production" ? null :
    Loader("Debug", () => import("./devel").then((a) => a.Devel));

// #endregion

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path={makeLibraryRouteSpec()} component={Library} />
            <Route exact path={makeLibraryRouteSpec("group")} component={Group} />
            <Route exact path={makeLibraryRouteSpec("archive")} component={Archive} />
            <Route exact path={makeLibraryRouteSpec("document")} component={Document} />
            <Route exact path={makeLibraryRouteSpec("notebook")} component={Notebook} />

            <Route exact path="/legal/imprint" component={Imprint} />
            <Route exact path="/legal/licenses" component={Licenses} />

            <Route exact path="/applications/glossary" component={Glossary} />
            <Route exact path="/applications/dictionary" component={Dictionary} />
            <Route exact path="/applications/keys" component={Keys} />

            {Devel && <Route exact path="/devel" component={Devel} />}
        </Switch>
    );
}
