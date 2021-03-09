### Dockerfile for MathHub-Frontend

# Start from nodejs
FROM node:15

# no telemetry please
ENV NEXT_TELEMETRY_DISABLED=1

# We have a lot of configurations that can be made
# at compile time, but will be needed at runtime

ARG LIBRARY_URL="/:mathhub/"
ENV LIBRARY_URL=${LIBRARY_URL}

ARG NEWS_URL="/news.json"
ENV NEWS_URL=${NEWS_URL}

ARG GLOSSARY_URL=""
ENV GLOSSARY_URL=${GLOSSARY_URL}

ARG ADMIN_URL="/admin/"
ENV ADMIN_URL=${ADMIN_URL}

ARG TRANSLATION_URL=""
ENV TRANSLATION_URL=${TRANSLATION_URL}

ARG UPSTREAM_BASE_URL="http://compositor:80/"
ENV UPSTREAM_BASE_URL=${UPSTREAM_BASE_URL}

# We will place all our code into /app/
WORKDIR /app/

# Add the dependency files first, then install them
# This will take advantage of caching if the deps did not
# change
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
RUN yarn --no-cache --frozen-lockfile install

# Add all the remaining source code
ADD pages /app/pages/
ADD src /app/src
ADD public /app/public

ADD .gitignore /app/.gitignore
ADD LICENSE.txt /app/LICENSE.txt
ADD next.config.js next.config.js
ADD README.md /app/README.md
ADD tsconfig.json /app/tsconfig.json

# Generate a distribution
RUN mkdir -p /app/src/assets/generated && yarn mklegal && yarn build

# and set up the server
EXPOSE 8043
USER "www-data:www-data"
CMD [ "yarn", "start", "--port", "8043", "--hostname", "0.0.0.0" ]
