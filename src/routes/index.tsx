import { Loader } from "../components/common/lazy";

import { rejectAfter } from "../utils/promises";

const Home = Loader("Home Page", () => import("./home").then((h) => h.Home));

const Group = Loader("Group", () => import("./group").then((g) => g.Group));
const Archive = Loader("Archive", () => import("./archive").then((a) => a.Archive));
const Document = Loader("Document", () => import("./document").then((d) => d.Document));

const About = Loader("About", () => rejectAfter(import("./about").then((a) => a.About), 1000, "stuff"));
const Legal = Loader("Legal", () => import("./legal").then((l) => l.Legal));
const HelpOne = Loader("HelpOne", () => import("./help/helpOne").then((h) => h.Help));
const HelpTwo = Loader("HelpTwo", () => import("./help/helpTwo").then((h) => h.Help));
const Glossary = Loader("Glossary", () => import("./applications/glossary").then((g) => g.Glossary));
const Dictionary = Loader("Dictionary", () => import("./applications/dictionary").then((d) => d.Dictionary));
const Library = Loader("Library", () => import("./library").then((l) => l.Libray));

import * as React from "react";

import {Route, Switch} from "react-router-dom";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/content" component={Library} />
            <Route exact path="/content/:name" component={Group} />
            <Route exact path="/content/:group/:name" component={Archive} />
            <Route exact path="/content/:group/:archive/:name" component={Document} />

            <Route exact path="/about" component={About} />
            <Route exact path="/legal" component={Legal} />
            <Route exact path="/help/helpone" component={HelpOne} />
            <Route exact path="/help/helptwo" component={HelpTwo} />
            <Route exact path="/applications/glossary" component={Glossary} />
            <Route exact path="/applications/dictionary" component={Dictionary} />
        </Switch>
    );
}
