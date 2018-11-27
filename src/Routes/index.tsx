import { DictToSwitch } from "../Components/Common";
import { PropsOfComponent } from "../Types/react";

type IRouteDict = PropsOfComponent<DictToSwitch>["routes"];

export {makeLibraryRouteSpec as urlMaker} from "./Library/Structure/Links";

// the home route
const Home = async () => import("./Home").then(h => h.Home);
Home.routeTitle = "Home";

// the error route
const Error = async () => import("./DefaultPage").then(e => e.DefaultPage);
Error.routeTitle = "Error 404";

// #region "Archive Structure"
const archivesImport = async () => import("./Library/Archives");

const Library = async () => archivesImport().then(l => l.Library);
Library.routeTitle = "Library";

const Group = async () => archivesImport().then(g => g.Group);
Group.routeTitle = "Group";

const Tag = async () => archivesImport().then(t => t.Tag);
Tag.routeTitle = "Tag";

const Archive = async () => archivesImport().then(a => a.Archive);
Archive.routeTitle = "Archive";

// #endregion

// #region "Narration"
const narrativeImport = async () => import("./Library/Document");

const Document = async () => narrativeImport().then(d => d.default);
Document.routeTitle = "Document";
// #endregion

// #region "Narration"
const newsImport = async () => import("./News");

const NewsList = async () => newsImport().then(d => d.NewsList);
NewsList.routeTitle = "News";

const NewsPage = async () => newsImport().then(d => d.NewsPage);
NewsPage.routeTitle = "News";
// #endregion

// #region "Applications"
const applicationImport = async () => import("./Applications");

const Glossary = async () => applicationImport().then(g => g.Glossary);
Glossary.routeTitle = "Glossary";

const Dictionary = async () => applicationImport().then(d => d.Dictionary);
Dictionary.routeTitle = "Glossary";

const Keys = async () => applicationImport().then(k => k.Keys);
Keys.routeTitle = "Keys";

const Logger = async () => applicationImport().then(l => l.Logger);
Logger.routeTitle = "Logger";
// #endregion

// # region "Legal"
const legalImport = async () => import("./Legal");

const Licenses = async () => legalImport().then(l => l.Licenses);
Licenses.routeTitle = "Legal";

const Imprint = async () => legalImport().then(i => i.Imprint);
Imprint.routeTitle = "Imprint";
// # endregion

const Devel = async () => import("./Devel");
Devel.routeTitle = "Devel";

// #endregion

/**
 * All our routes
 */
const routes: IRouteDict = {
    // the home route
    "/": Home,

    // library Routes
    "library": Library,
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

    // the error route
    "": Error,
};

export default routes;
