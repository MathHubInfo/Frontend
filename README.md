# MathHub-Frontend

[![Build Status](https://img.shields.io/travis/MathHubInfo/Frontend.svg)](https://travis-ci.com/MathHubInfo/Frontend)
[![DockerHub Status](https://img.shields.io/docker/automated/mathhub/frontend.svg)](https://hub.docker.com/r/mathhub/frontend/)

A new MathHub Frontend written with [Typescript](https://www.typescriptlang.org/) in [React](https://reactjs.org/) and [Next.js](https://nextjs.org/).

## For Users

This is the source code for the MathHub Frontend. 

The MathHub Frontend exists in two different versions:

- A stable (`master`) version, that is well-tested and more-feature-complete.
  This is deployed at [mathhub.info](https://mathhub.info/).

- A development (`devel`) version, which has the newest features but might be unstable. 
  This is deployed at [beta.mathhub.info](https://beta.mathhub.info). 

The MathHub Frontend is backed by an [MMT instance](https://uniformal.github.io/doc/). 

### MathHub Releases

Because of this backing by an MMT instance, MathHub release cycles are coupled to their MMT counterparts. 

In particular, because MMT aims for releases every 6 weeks, the MathHub Frontend does the same. 

In a nutshell, the major version number is that of the MMT release, the minor number is used for MathHub-internal purposes.

This also means that http://mathhub.info will get a new release (and functionality update) about every six weeks following the MMT release schedule.


### Supported browsers

We support the following browsers:
    * the last major version of Firefox + Firefox Android, and Firefox ESR
    * the last major version of Chrome + Chrome Android
    * the last major version of Safari + Safari IOS

Developers can see a concrete list of supported browsers by running:

```bash
    yarn browserslist
```

## For Deployers

The Frontend is best deployed using the [MathHub System](https://github.com/MathHubInfo/Mathhub) deployment. 

However it is also possible to deploy it stand-alone. 

### Deployment using Docker

To easily deploy an instance of the frontend, a [Dockerfile](Dockerfile) is available. 
It serves a server instance of this app. 
This takes all the variables above as build arguments. 
In particular, the `UPSTREAM_BASE_URL` should be set accordingly. 

The Docker Image is available on DockerHub as [mathhub/frontend](https://hub.docker.com/r/mathhub/frontend/). 
The image is built using automated builds, and automatically updates afer every commit. 

To run it, use something like:

```
docker run -p 8043:8043 mathhub/frontend
```

## For Developers

We use [yarn](https://yarnpkg.com/en/), which we assume in the following is installed. 

```bash

# install dependencies (needed once, or whenever new dependencies
# are added
yarn

# To build a complete distribution for production use the following
# command. This will internally split into the three commands below.
yarn dist

# When generating a distribution, it is required
# to run the following to generate notices.txt file for license 
# information of *external* dependencies
yarn mklegal

# run babel, i.e. compile and compress the source into the .next/
# folder. Afterwards it is possible to run `yarn start`.
yarn build

# To run code for local development several commands exist
# skip to the end to see the import bits

# run a local webserver for development on localhost:3000
# this takes a couple seconds to start up and will afterwards
# automatically re-compile the project when any of the files
# under src/ are changed. 
# It is recommended to use Chrome + React DevTools extension
# for a proper debugging interface
yarn dev

# By default the webpack-dev-server expects a corresponding API
# to run on http://localhost:9000/:mathhub/. 
# This URL can be changed using the LIBRARY_URL variable, e.g. like so:
yarn cross-env LIBRARY_URL=https://mmt.mathhub.info/:mathhub/ dev

# Furthermore, in case no MMT is running, a Mock Client exists during development. 
# This can be enabled like so:
yarn cross-env LIBRARY_URL= dev

# For convenience two shortcuts exist:
yarn devmock
yarn devmmt

# both start the dev server on port 3000. 
# the first command uses a mocked mmt instance, the second one
# uses a real mmt expected to be at localhost:8080

# running a production server on port 3000 (needs yarn build)
yarn start

```

As an IDE, it is recommended to use [Visual Studio Code](https://code.visualstudio.com/) (>= May 2018 (version 1.24)) along with the [TypeScript TSLint Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin). 

Both should work out-of-the-box after cloning this repository and running the `yarn` command above. 

### File Structure

This repository conists of the following structure:
* `pages/` -- Page route definitions 
* `src/` -- Source files containing TypeScript code
* `static/` -- Static content, such as
* `next.config.js` -- NextJS Configuration
* various build & configuration files in the root folder

And the following un-committed folders that are generated automatically:

* `out/` -- Generated Distribution Files (local only)
* `node_modules/` -- External depenencies (local only)
* `.next/` -- Cache folder used by development server

## For Developers

## Environment Variables

The MathHub Frontend takes several environment variables, which can be used to fine-tune the behaviour of the frontend. 
Variables are split into two kinds: Compile-Time Variables and Runtime variables. 

#### Build-Time Environment Variables

Build-Time Environment Variables are set at compilation time of the code and can not be changed during runtime. 
They are configured inside of `next.config.js`. 

The supported variables are:

* `LIBRARY_URL` -- The URL to the MathHub MMT Extension. If omitted, defaults to mocking the MMT server. 
* `NEWS_URL` -- The URL to retrieve news items from. If omitted, defaults to the news.json file under assets. 
* `GLOSSARY_URL` -- The URL to retrieve glossary items from. If omitted, defaults to the glossary.json file under mocks.
* `TRANSLATION_URL` -- The URL to translate text with. If omitted, translation is disabled.
* `UPSTREAM_BASE_URL` -- Server Side only (see below). Prefix for all requests sent to the upstream server. 
* `RUNTIME_CONFIG_URL` -- If set to a non-empty string, load runtime configuration variables from the given url. 

#### Runtime Environment Variables

Runtime variables are configuration variables that are loaded lazily at runtime using Ajax. 

Currently there are no runtime environment variables.


### Travis Testing

This project has minimal Travis CI tests. 

These check that the project *compiles* in both production and non-production configurations under Node Versions 8, 9 and 10. 


## License & Acknowledgements

The Code in this project is licensed under AGPL 3.0. 
