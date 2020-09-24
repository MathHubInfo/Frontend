import dynamic from "next/dynamic";

type ITGViewOptions = import("../clientside/TGView").ITGViewOptions;

const TGView: React.ComponentType<ITGViewOptions> = dynamic(() => import("../clientside/TGView"), {
    ssr: false, // load the tgview component, client side only
});
export default TGView;
