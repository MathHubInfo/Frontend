import { IRouteDict } from "../components/common/urls";

export {makeLibraryRouteSpec as urlMaker} from "./library/structure/links";

/** the home route */
const Home = () => import(/* webpackChunkName: "home"*/"./home").then((h) => h.Home);
Home.routeTitle = "Home";

// #region "Archive Structure"
const archivesImport = () => import(/* webpackChunkName: "archives" */"./library/archives");

const Library = () => archivesImport().then((l) => l.Library);
Library.routeTitle = "Library";

const Group = () => archivesImport().then((g) => g.Group);
Group.routeTitle = "Group";

const Archive = () => archivesImport().then((a) => a.Archive);
Archive.routeTitle = "Archive";

// #endregion

// #region "Narration"
const narrativeImport = () => import(/* webpackChunkName: "narrative" */"./library/narrative");

const Document = () => narrativeImport().then((d) => d.Document);
Document.routeTitle = "Document";

const Notebook = () => narrativeImport().then((n) => n.Notebook);
Notebook.routeTitle = "Notebook";
// #endregion

// #region "Applications"
const applicationImport = () => import(/* webpackChunkName: "applications" */"./applications");

const Glossary = () => applicationImport().then((g) => g.Glossary);
Glossary.routeTitle = "Glossary";

const Dictionary = () => applicationImport().then((d) => d.Dictionary);
Dictionary.routeTitle = "Glossary";

const Keys = () => applicationImport().then((k) => k.Keys);
Keys.routeTitle = "Keys";
// #endregion

// # region "Legal"
const legalImport = () => import(/* webpackChunkName: "legal"*/"./legal");

const Licenses = () => legalImport().then((l) => l.Licenses);
Licenses.routeTitle = "Legal";

const Imprint = () => legalImport().then((i) => i.Imprint);
Imprint.routeTitle = "Imprint";
// # endregion

const Devel = () => import(/* webpackChunkName: "devel"*/"./devel").then((d) => d.Devel);
Devel.routeTitle = "Devel";

// #endregion

/**
 * All our routes
 */
export const routes: IRouteDict = {
    // the home route
    "/": Home,

    // library Routes
    "": Library,
    "group": Group,
    "archive": Archive,
    "document": Document,
    "notebook": Notebook,

    // legal
    "/legal/imprint": Imprint,
    "/legal/licenses": Licenses,

    // applications
    "/applications/glossary": Glossary,
    "/applications/dictionary": Dictionary,
    "/applications/keys": Keys,

    "/devel/": Devel,
};

export default routes;
