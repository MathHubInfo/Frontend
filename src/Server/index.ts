import { default as express, static as expressStatic } from "express";
import { join } from "path";

import { default as config } from "../Bootstrap/server";
import { makeContext } from "../Context";
import { default as routes } from "../Routes";
import { makeExpressLibraryRoute } from "../Routes/Library/Structure/Links";

import DictToExpress from "./DictToExpress";

async function main(args: string[]) {
    // Read in the distFolder argument
    if (args.length < 2 || args.length > 4) {
        // tslint:disable-next-line:no-console
        console.error(`Usage: ${args[0]} PATH/TO/DIST [port] [host]`);
        process.exit(1);
    }

    // build the paths
    const distPath = join(process.cwd(), args[1]);
    const indexHTMLPath = join(distPath, "index.html");

    // find where to listen to
    const port = parseInt(args[2], 10) || 3000;
    const host = args[3] || "localhost";
    const listenAddress = `${host}:${port}`;

    // build a MathHub Context
    const context = makeContext(await config(process.env.UPSTREAM_BASE_URL || ""));

    // create an express app
    const app = express();

    app.get("/index.html", (req: express.Request, res: express.Response) => res.redirect(302, "/"));
    app.use(DictToExpress(routes, context, makeExpressLibraryRoute));
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.mathHubInfo !== undefined) {
            res.status(req.mathHubInfo ? 404 : 200); // set status based on if we are 404 or not
            res.sendFile(indexHTMLPath); // and return the file
        } else
            next();
    });
    app.use(expressStatic(args[1]));
    app.use((error: {}, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.render("error", { error });
    });

    // tslint:disable-next-line:no-console
    app.listen(port, host, () => console.log(`MathHub Listening on ${listenAddress}!`));
}

main(process.argv.slice(1)).catch(e => { throw e; });
