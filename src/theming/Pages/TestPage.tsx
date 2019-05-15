import getConfig from "next/config";
import dynamic from "next/dynamic";


let TestPage: React.ComponentClass;
switch (getConfig().publicRuntimeConfig.theme) {
    default:
        TestPage = dynamic(import("../../themes/classic/Pages/Test"));
}

export default TestPage;
