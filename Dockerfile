# We need a node image with yarn
FROM node as builder

# The URL to MMT to use in the build
ARG MMT_URL="/:mathhub/"
ENV MMT_URL=${MMT_URL}

ARG BROWSER_ROUTER="/"
ENV BROWSER_ROUTER=${BROWSER_ROUTER}

ARG NEWS_URL="/news.json"
ENV NEWS_URL=${NEWS_URL}

ARG GLOSSARY_URL=""
ENV GLOSSARY_URL=${GLOSSARY_URL}

ARG RUNTIME_CONFIG_URL="/config.json"
ENV RUNTIME_CONFIG_URL=${RUNTIME_CONFIG_URL}

ARG UPSTREAM_BASE_URL="http://compositor:80/"
ENV UPSTREAM_BASE_URL=${UPSTREAM_BASE_URL}

# Add all of the app into /app/
ADD assets/ /app/assets/
ADD build/ /app/build
ADD src/ app/src/
ADD .babelrc /app/
ADD LICENSE.txt /app/
ADD package.json /app/
ADD tsconfig.json /app/
ADD tsconfig.server.json /app/
ADD webpack.config.js /app/
ADD webpack.config.prod.js /app/
ADD tslint.json /app/
ADD yarn.lock /app/


# Install and run build
WORKDIR  /app/
RUN yarn && yarn dist && yarn sdist

# and set up the server
EXPOSE 8043
CMD [ "yarn", "--silent", "server", "dist/", "8043", "0.0.0.0" ]