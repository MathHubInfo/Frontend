import dynamic from "next/dynamic";

type ITGViewOptions = import("./client/tgview").ITGViewOptions;

const TGView: React.ComponentClass<ITGViewOptions> = dynamic(() => import("./client/tgview"), {
    ssr: false, // load the tgview component, client side only
});
export default TGView;
