# MathHub-React-Frontend

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
