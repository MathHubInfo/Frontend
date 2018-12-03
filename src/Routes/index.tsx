import { IArchive, IDocument, IGroup, ITag } from "../Clients/LibraryClient/objects";
import { INewsItem } from "../Clients/NewsClient";
import { IMathHubContext } from "../Context";
import Routing from "../Routing";

const routes = new Routing();
// tslint:disable-next-line:export-name
export default routes;

routes.addPlainRoute(
    "Home", "/",
    async () => import("./Home"),
);

routes.addPlainRoute(
    "Error 404", "",
    async () => import("./DefaultPage"),
    {clientOnly: true},
);

// #region "Library Routes"
routes.addItemRoute(
    "Library", "",
    () => import("./Library/Archives/Library"),
    (context: IMathHubContext) => context.libraryClient.getGroups(),
);

routes.addItemRoute(
    "Group", "group",
    () => import("./Library/Archives/Group"),
    (context: IMathHubContext, {id}: {id: string}) => context.libraryClient.getGroup(id),
    { serverHeader: (data: IGroup) => ({title: data.name}) },
);

routes.addItemRoute(
    "Tag", "tag",
    () => import("./Library/Archives/Tag"),
    (context: IMathHubContext, {id}: {id: string}) => context.libraryClient.getTag(id),
    { serverHeader: (data: ITag) => ({title: data.name}) },
);

routes.addItemRoute(
    "Archive", "archive",
    () => import("./Library/Archives/Archive"),
    (context: IMathHubContext, {id}: {id: string}) => context.libraryClient.getArchive(id),
    { serverHeader: (data: IArchive) => ({title: data.name}) },
);

routes.addItemRoute(
    "Document", "document",
    () => import("./Library/Document"),
    (context: IMathHubContext, {id}: {id: string}) => context.libraryClient.getDocument(id),
    { serverHeader: (data: IDocument) => ({title: data.name}) },
);

// #endregion

// #region "News"
routes.addDataRoute(
    "News", "/news/",
    () => import("./News/List"),
    (context: IMathHubContext) => context.newsClient.loadAll(),
);

routes.addItemRoute(
    "News", "/news/:id",
    () => import("./News/Page"),
    (context: IMathHubContext, {id}: {id: string}) => context.newsClient.load(id),
    { serverHeader: (data: INewsItem) => ({title: data.title}) },
);
// #endregion

// #region "Applications"
routes.addPlainRoute(
    "Glossary", "/applications/glossary",
    () => import("./Applications/Glossary"),
);

routes.addPlainRoute(
    "Keys", "/applications/keys",
    () => import("./Applications/Keys"),
);

routes.addPlainRoute(
    "Dictionary", "/applications/dictionary",
    () => import("./Applications/Dictionary"),
);

routes.addPlainRoute(
    "Logger", "/applications/logger",
    () => import("./Applications/Logger"),
);

// #endregion

// # region "Legal"
routes.addDataRoute(
    "Licenses", "/legal/licenses",
    () => import("./Legal/Licenses"),
    (context: IMathHubContext) => Promise.all([
        import("../../../LICENSE.txt").then(d => d.default),
        context.httpClient.getOrError<string>("NOTICES.txt", () => true),
    ]),
);

routes.addPlainRoute(
    "Imprint", "/legal/imprint",
    () => import("./Applications/Dictionary"),
);
// # endregion

routes.addPlainRoute(
    "Devel", "/devel/",
    () => import("./Devel"),
    { develOnly: true },
);
