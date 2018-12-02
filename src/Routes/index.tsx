import { DictToSwitch } from "../Components/Common";
import { IMathHubContext } from "../Context";
import { PropsOfComponent } from "../Types/react";

type IRouteDict = PropsOfComponent<DictToSwitch>["routes"];

export {makeReactLibraryRoute as urlMaker} from "./Library/Structure/Links";

// the home route
const Home = async () => import("./Home").then(h => h.Home);
Home.routeTitle = "Home";

// the error route
const Error = async () => import("./DefaultPage").then(e => e.DefaultPage);
Error.routeTitle = "Error 404";
Error.isClientOnly = true;

// #region "Archive Structure"
const archivesImport = async () => import("./Library/Archives");

const Library = async () => archivesImport().then(l => l.Library);
Library.routeTitle = "Library";

const Group = async () => archivesImport().then(g => g.Group);
Group.routeTitle = "Group";
Group.is404 = async (params: {id: string}, context: IMathHubContext) =>
    await context.libraryClient.getGroup(params.id) === undefined;

const Tag = async () => archivesImport().then(t => t.Tag);
Tag.routeTitle = "Tag";
Tag.is404 = async (params: {id: string}, context: IMathHubContext) =>
    await context.libraryClient.getTag(params.id) === undefined;

const Archive = async () => archivesImport().then(a => a.Archive);
Archive.routeTitle = "Archive";
Archive.is404 = async (params: {id: string}, context: IMathHubContext) =>
    await context.libraryClient.getArchive(params.id) === undefined;

// #endregion

// #region "Narration"
const narrativeImport = async () => import("./Library/Document");

const Document = async () => narrativeImport().then(d => d.default);
Document.routeTitle = "Document";
Document.is404 = async (params: {id: string}, context: IMathHubContext) =>
    await context.libraryClient.getDocument(params.id) === undefined;
// #endregion

// #region "Narration"
const newsImport = async () => import("./News");

const NewsList = async () => newsImport().then(d => d.NewsList);
NewsList.routeTitle = "News";

const NewsPage = async () => newsImport().then(d => d.NewsPage);
NewsPage.routeTitle = "News";
NewsPage.is404 = async (params: {id: string}, context: IMathHubContext) =>
    await context.newsClient.load(params.id) === undefined;
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
Devel.isDevelOnly = true;

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
