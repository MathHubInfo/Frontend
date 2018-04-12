/** This file is the entry point to the MathHub-React-Frontend */

import "babel-polyfill"; // load for side-effects and older browsers that do not support react

// React
import * as React from "react";
import * as ReactDOM from "react-dom";

// UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// all our components
import { Hello } from "./components/Hello";


ReactDOM.render(
    <MuiThemeProvider>
            <Hello compiler="TypeScript" framework="React" />
    </MuiThemeProvider>, 
    document.getElementById("example")
);