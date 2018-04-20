# MathHub-React-Frontend

WIP on a new MathHub Frontend written in React. 

## Usage
We use [yarn](https://yarnpkg.com/en/), whcih we assume in the following is installed. 

```bash

# install dependencies (needed once, or whenever new dependencies
# are added
yarn

# to build the distribution in production mode into the dist/
# folder. This includes an index.html file and can afterwards
# be served by a static webserver under any URL
yarn webpack --config=webpack.config.prod.js

# When generating a distribution, it is additionally recommended
# to run the following to generate NOTICES.txt file for license 
# information of *external* dependencies
yarn --ignore-platform licenses generate-disclaimer > dist/NOTICES.txt


# run a local webserver for development on localhost:8080
# this takes a couple seconds to start up and will afterwards
# automatically re-compile the project when any of the files
# under src/ are changed. 
# It is recommended to use Chrome + React DevTools extension
# for a proper debugging interface
yarn webpack-dev-server
```

## File Structure

This repository conists of the following structure: 
* `src/` -- Source files containing TypeScript code
* `assets/` -- Binary assets, such as logos & images
* `static/` -- Static content, that is loaded by TypeScript code

* ``build/` -- Build Configuration
* various build & configuration files in the root folder

And the following un-committed folders that are generated automatically:

* `dist/` -- Generated Distribution Files (local only)
* `node_modules/` -- External depenencies (local only)
* `.awcache/` -- Cache folder used by development server


## License & Acknowledgements

The Code in this project is licensed under GPL 3.0. 