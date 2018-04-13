import { Loader } from "components/common/loader"

import { rejectAfter } from "utils/promises"

const Home = Loader("Home Page", () => import("./home").then(h => h.Home));
const About = Loader("About", () => rejectAfter(import("./about").then(a => a.About), 1000, "stuff"));

import * as React from "react"
import {Switch, Route} from 'react-router-dom'

export default function Routes() {
    return <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
    </Switch>;
}
