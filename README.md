# MathHub-React-Frontend

[![Build Status](https://img.shields.io/travis/MathHubInfo/Frontend.svg)](https://travis-ci.org/MathHubInfo/Frontend)
[![DockerHub Status](https://img.shields.io/docker/automated/mathhub/frontend.svg)](https://hub.docker.com/r/mathhub/frontend/)

A new MathHub Frontend written in React. 

## MathHub Versions and Releases

As MMT is used as the Backend for MathHub, MathHub releases are tied to MMT releases. 

In a nutshell, the major version number is that of the MMT release, the minor number is used for MathHub-internal purposes.

This also means that http://mathhub.info will get a new release (and functionality update) about every six weeks following the MMT release schedule.


## Development Usage
We use [yarn](https://yarnpkg.com/en/), which we assume in the following is installed. 

```bash

# install dependencies (needed once, or whenever new dependencies
# are added
yarn

# To build a complete distribution for production use the following
# command. This will internally split into the two commands below.
yarn dist

# typescript, compile and compress the source into the dist/
# folder. This includes an index.html file and can afterwards
# be served by a static webserver under any URL. 
yarn build

# When generating a distribution, it is additionally required
# to run the following to generate NOTICES.txt file for license 
# information of *external* dependencies
yarn mklegal

# To run code for local development several commands exist
# skip to the end to see the import bits

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
MMT_URL= yarn webpack-dev-server

# For convenience two shortcuts exist:
yarn devmock
yarn devmmt

# both start webpack-dev-server on port 3000. 
# the first command uses a mocked mmt instance, the second one
# uses a real mmt expected to be at localhost:8080

```

As an IDE, it is recommended to use [Visual Studio Code](https://code.visualstudio.com/) (>= May 2018 (version 1.24)) along with the [TSLint Extension](https://marketplace.visualstudio.com/items?itemName=eg2.tslint). 

Both should work out-of-the-box after cloning this repository and running the `yarn` command above. 

### A note on caching

We make extensive use of caching. 
This means that subsequent builds should be much faster than initial builds. 

To clean the cache completly, run ```git clean -xdf .``` to remove all untracked files and folders from the current directory. 
Note that this will require to re-install dependencies using ```yarn```. 


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

## Environment Variables

The MathHub Frontend takes several environment variables, which can be used to fine-tune the behaviour of the frontend. 
All user-configurable variables are defined in [build/env.js](build/env.js) and have defaults so that they can be used within a local development setup. 
To override them, use the `VARIABLE=VALUE yarn webpack` or `VARIABLE=VALUE yarn webpack-dev-server` when building. 

The supported variables are:

* `MMT_URL` -- The URL to the MathHub MMT Extension. If omitted, defaults to mocking the MMT server. 
* `NEWS_URL` -- The URL to retrieve news items from. If omitted, defaults to the news.json file under assets. 
* `GLOSSARY_URL` -- The URL to retrieve glossary items from. If omitted, defaults to the glossary.json file under mocks.
* `ADMIN_URL` -- URL to the admin interface, defaults to `/admin/`
* `BROWSER_ROUTER` -- If set to a non-empty string, use real webserver urls instead of fragments with the given base path. For this to work, the webserver should fallback to `index.html` on 404s. 
* `SHOW_RIBBON` -- If set to `beta` show a ribbon indiciating the site is in beta
* `RUNTIME_CONFIG_URL` -- If set to a non-empty string, load all other configuration variables at runtime from the given url. This may not behave well with `BROWSER_ROUTER`. 

## Deployment via Docker

To easily deploy an instance of the frontend, a [Dockerfile](Dockerfile) is available. 
It serves a static build of the react app on port 8043. 
It takes a build argument `MMT_URL`, which can be used to customize the user-facing URL of the corresponding MMT Backend. 

The Docker Image is available on DockerHub as [mathhub/frontend](https://hub.docker.com/r/mathhub/frontend/). 
It assumes that the user-facing MMT Backend is served under `/:mathhub/`, meaning it is mixed into the static server using some form of proxy. 
It furthermore assume that the admin-backend is also mixed into the server and served under `/admin`. 
The image is built using automated builds, and automatically updates afer every commit. 

To run it, use something like:

```
docker run -p 8043:8043 mathhub/frontend
```

## Travis Testing

This project has minimal Travis CI tests. 

These check that the project *compiles* in both production and non-production configurations under Node Versions 8, 9 and 10. 

## Supported browsers

We support the following browsers:
    * the last major version of Firefox + Firefox Android, and Firefox ESR
    * the last major version of Chrome + Chrome Android
    * the last major version of Safari + Safari IOS

To view a concrete list of supported browsers, run:

```bash
    yarn browserslist
```

## License & Acknowledgements

The Code in this project is licensed under GPL 3.0. 
