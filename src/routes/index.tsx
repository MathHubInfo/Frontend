import { DictToSwitch } from "../components/common";
import { PropsOfComponent } from "../types/react";
type IRouteDict = PropsOfComponent<DictToSwitch>["routes"];

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

const Tag = () => archivesImport().then((t) => t.Tag);
Tag.routeTitle = "Tag";

const Archive = () => archivesImport().then((a) => a.Archive);
Archive.routeTitle = "Archive";

// #endregion

// #region "Narration"
const narrativeImport = () => import(/* webpackChunkName: "narrative" */"./library/document");

const Document = () => narrativeImport().then((d) => d.default);
Document.routeTitle = "Document";
// #endregion

// #region "Narration"
const newsImport = () => import(/* webpackChunkName: "news" */"./news");

const NewsList = () => newsImport().then((d) => d.NewsList);
NewsList.routeTitle = "News";

const NewsPage = () => newsImport().then((d) => d.NewsPage);
NewsPage.routeTitle = "News";
// #endregion

// #region "Applications"
const applicationImport = () => import(/* webpackChunkName: "applications" */"./applications");

const Glossary = () => applicationImport().then((g) => g.Glossary);
Glossary.routeTitle = "Glossary";

const Dictionary = () => applicationImport().then((d) => d.Dictionary);
Dictionary.routeTitle = "Glossary";

const Keys = () => applicationImport().then((k) => k.Keys);
Keys.routeTitle = "Keys";

const Logger = () => applicationImport().then((l) => l.Logger);
Logger.routeTitle = "Logger";
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
    "tag": Tag,

    // news routes
    "/news/": NewsList,
    "/news/:id": NewsPage,

    // legal
    "/legal/imprint": Imprint,
    "/legal/licenses": Licenses,

    // applications
    "/applications/glossary": Glossary,
    "/applications/dictionary": Dictionary,
    "/applications/keys": Keys,
    "/applications/logger": Logger,

    "/devel/": Devel,
};

export default routes;
