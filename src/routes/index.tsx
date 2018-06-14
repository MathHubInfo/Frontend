
import * as React from "react";

import { Route, Switch } from "react-router-dom";

import { CreateSpinningLoader as Loader } from "../components/common/lazy";

const Home = Loader("Home Page", () => import("./home").then((h) => h.Home));

import { makeLibraryRouteSpec } from "./library";
const Library = Loader("Library", () => import("./library/library").then((l) => l.Libray));
const Group = Loader("Group", () => import("./library/group").then((g) => g.Group));
const Archive = Loader("Archive", () => import("./library/archive").then((a) => a.Archive));
const Document = Loader("Document", () => import("./library/document").then((d) => d.Document));

const Glossary = Loader("Glossary", () => import("./applications/glossary").then((g) => g.Glossary));
const Dictionary = Loader("Dictionary", () => import("./applications/dictionary").then((d) => d.Dictionary));

const Licenses = Loader("Legal", () => import("./legal/licenses").then((l) => l.Licenses));
const Imprint = Loader("Imprint", () => import("./legal/imprint").then((i) => i.Imprint));

// for testing only, we have a debug route
const Devel = process.env.NODE_ENV === "production" ? null :
    Loader("Debug", () => import("./devel").then((a) => a.Devel));

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path={makeLibraryRouteSpec()} component={Library} />
            <Route exact path={makeLibraryRouteSpec("group")} component={Group} />
            <Route exact path={makeLibraryRouteSpec("archive")} component={Archive} />
            <Route exact path={makeLibraryRouteSpec("document")} component={Document} />

            <Route exact path="/legal/imprint" component={Imprint} />
            <Route exact path="/legal/licenses" component={Licenses} />

            <Route exact path="/applications/glossary" component={Glossary} />
            <Route exact path="/applications/dictionary" component={Dictionary} />

            {Devel && <Route exact path="/devel" component={Devel} />}
        </Switch>
    );
}
