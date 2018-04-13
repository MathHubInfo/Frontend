/** This file is the entry point to the MathHub-React-Frontend */

// load the polyfill for older browsers
import "babel-polyfill";

// loading nice CSS
import 'semantic-ui-css/semantic.min.css';

Promise.all([
    import('react'),
    import('react-dom'),

    import('components').then(mh => mh.MathHub)
]).then(([React, ReactDOM, MathHub]) => {
    ReactDOM.render(
        <MathHub mmtURL="http://localhost:8080/" />, 
        document.getElementById("mathhub")
    );
});