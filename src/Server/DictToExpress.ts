import { RequestHandler, Router } from "express";

import { IMathHubContext } from "../Context";
import Routing from "../Routing";

export default function DictToExpress(
    dict: Routing,
    context: IMathHubContext,
    urlMaker: (spec: string) => string,
): RequestHandler {
    const router = Router({strict: true});

    // create react routes for each of the elements
    dict.createExpressRoutes(urlMaker, context)
        .forEach(([r, s]) => {
            // tslint:disable-next-line:no-console
            console.log(`Registering route ${r}`);
            router.get(r, s);
        });

    return router;
}
