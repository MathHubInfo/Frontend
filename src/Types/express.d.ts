import { IServerRouteInfo } from "../Routing/makeRouteInfo";
declare global {
    namespace Express {
        export interface Request {
            mathHubInfo?: IServerRouteInfo;
        }
    }
}