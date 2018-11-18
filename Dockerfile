# We need a node image with yarn
FROM node as builder

# The URL to MMT to use in the build
ARG MMT_URL="/:mathhub/"
ARG BROWSER_ROUTER="/"
ARG NEWS_URL="/news.json"
ARG GLOSSARY_URL="/glossary.json"

# Add all of the app into /app/
ADD assets/ /app/assets/
ADD build/ /app/build
ADD src/ app/src/
ADD .babelrc /app/
ADD LICENSE.txt /app/
ADD package.json /app/
ADD tsconfig.json /app/
ADD webpack.config.js /app/
ADD webpack.config.prod.js /app/
ADD tslint.json /app/
ADD yarn.lock /app/


# Install and run build
WORKDIR  /app/
RUN yarn \
    && GLOSSARY_URL=${GLOSSARY_URL} NEWS_URL=${NEWS_URL} MMT_URL=${MMT_URL} BROWSER_ROUTER=${BROWSER_ROUTER} yarn webpack --config=webpack.config.prod.js \
    && yarn --ignore-platform licenses generate-disclaimer > dist/NOTICES.txt

# And place onto a static server
FROM pierrezemb/gostatic:latest
COPY --from=builder /app/dist/ /srv/http
EXPOSE 8043
CMD ["-fallback", "/index.html"]