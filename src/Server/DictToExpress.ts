import { RequestHandler, Router } from "express";

import { DictToSwitch } from "../Components/Common";
import { IMathHubContext } from "../Context";
import { PropsOfComponent } from "../Types/react";
import { StringValueType } from "../Types/utils";

type IRouteDict = PropsOfComponent<DictToSwitch>["routes"];
type IRouteHandler = StringValueType<IRouteDict>;

export default function DictToExpress(
    dict: IRouteDict,
    context: IMathHubContext,
    urlMaker: (spec: string) => string,
): RequestHandler {
    const router = Router({strict: true});
    Object.keys(dict).forEach(k => {
        const route = k.startsWith("/") ? k : urlMaker(k);
        const handler = dict[k];

        // if we are client only, then return
        if (handler.isClientOnly === true) return;

        const theHandler = (typeof handler.is404 === "function") ?
            make404ableRoute(route, handler, context) :
            makePlainRoute(route);

        router.get(route, theHandler);
    });

    return router;
}

function makePlainRoute(route: string): RequestHandler {
    // tslint:disable-next-line:no-console
    console.log(`Registering [${route}]`);

    return (req, res, next) => {
        req.mathHub404 = false;
        next();
    };
}

function make404ableRoute(route: string, handler: IRouteHandler, context: IMathHubContext): RequestHandler {
    // tslint:disable-next-line:no-console
    console.log(`Registering [${route}] with 404 check`);

    return async (req, res, next) => {
        // tslint:disable-next-line:no-console
        console.log(`[${route}]: Calling 404 handler`);
        const params = req.params as {id: string};
        try {
            if (handler.is404)
                req.mathHub404 = await handler.is404(params, context);
        } catch (e) {
            return next(e);
        }

        next();
    };
}
