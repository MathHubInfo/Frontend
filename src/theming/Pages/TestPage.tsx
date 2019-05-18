import getConfig from "next/config";
import dynamic from "next/dynamic";
import { ITestState } from "./Applications/ITestProps";


let TestPage: React.ComponentClass<ITestState>;
switch (getConfig().publicRuntimeConfig.theme) {
    default:
        TestPage = dynamic(import("../../themes/classic/Pages/Test"));
}

export default TestPage;
