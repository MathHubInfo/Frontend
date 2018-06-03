# MathHub-React-Frontend

[![Build Status](https://img.shields.io/travis/MathHubInfo/Frontend.svg)](https://travis-ci.org/MathHubInfo/Frontend)
[![DockerHub Status](https://img.shields.io/docker/automated/mathhub/frontend.svg)](https://hub.docker.com/r/mathhub/frontend/)

WIP on a new MathHub Frontend written in React. 

## Development Usage
We use [yarn](https://yarnpkg.com/en/), which we assume in the following is installed. 

```bash

# install dependencies (needed once, or whenever new dependencies
# are added
yarn

# to build the distribution in production mode into the dist/
# folder. This includes an index.html file and can afterwards
# be served by a static webserver under any URL
yarn webpack --config=webpack.config.prod.js

# When generating a distribution, it is additionally required
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

# By default the webpack-dev-server expects a corresponding API
# to run on http://localhost:9000/:mathhub/. 
# This URL can be changed using the MMT_URL variable, e.g. like so:
MMT_URL=https://mmt.mathhub.info/:mathhub/ yarn webpack-dev-server

# Furthermore, in case no MMT is running, a Mock Client exists during development. 
# This can be enabled like so:
MOCK_MMT=1 yarn webpack-dev-server
```

As an IDE, it is recommended to use [Visual Studio Code](https://code.visualstudio.com/) along with the [TSLint Extension](https://marketplace.visualstudio.com/items?itemName=eg2.tslint). 

Both should work out-of-the-box after cloning this repository and running the `yarn` command above. 

**Caveat**: 
Until VSCode has updated to TypeScript 2.9.x (this should happen sometime during early June), it is neccessary to use the workspace version of TypeScript instead of the bundled version. 
To achieve this, install using `yarn`, then open any TypeScript file and left click on the TypeScript Version in the bottom right corner of VSCode.
In the opening dialog select "use workspace version". 

## File Structure

This repository conists of the following structure: 
* `src/` -- Source files containing TypeScript code
* `assets/` -- Binary assets, such as logos & images
* `static/` -- Static content, that is loaded by TypeScript code
* `build/` -- Build Configuration
* various build & configuration files in the root folder

And the following un-committed folders that are generated automatically:

* `dist/` -- Generated Distribution Files (local only)
* `node_modules/` -- External depenencies (local only)
* `.awcache/` -- Cache folder used by development server

## Deployment via Docker

To easily deploy an instance of the frontend, a [Dockerfile](Dockerfile) is available. 
It serves a static build of the react app on port 8043. 
It takes a build argument `MMT_URL`, which can be used to customize the user-facing URL of the corresponding MMT Backend. 

The Docker Image is available on DockerHub as [mathhub/frontend](https://hub.docker.com/r/mathhub/frontend/). It assumes that the user-facing MMT Backend is served under `/mmt`, meaning it is mixed into the static server using some form of proxy. 
The image is built using automated builds, and automatically updates afer every commit. 

To run it, use something like:

```
docker run -p 8043:8043 mathhub/frontend
```

## Travis Testing

This project has minimal Travis CI tests. 

These check that the project *compiles* in both production and non-production configurations under Node Versions 8, 9 and 10. 

## License & Acknowledgements

The Code in this project is licensed under GPL 3.0. 
