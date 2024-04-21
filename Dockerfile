FROM node:16.16.0-alpine as build

ARG PATH_CONTEXT \
    NODE_OPTIONS \
    ENVIRONMENT \
    APP_SEMVER

ENV NODE_ENV=development \
    DISABLE_ESLINT_PLUGIN=true \
    CI=false \
    NODE_OPTIONS=${NODE_OPTIONS} \
    PATH=/app/node_modules/.bin:$PATH \
    YARN_CACHE_FOLDER=${PATH_CONTEXT}/.yarn-cache \
    GENERATE_SOURCEMAP=false \
    REACT_APP_APP_SEMVER=$APP_SEMVER

WORKDIR /app

COPY ./package.json \
    ./yarn.lock \
    ./tsconfig.json \
    ./config-overrides.js \
    ./tsconfig.json \
    ./.eslint* \
    .npmrc ./

COPY ./src ./src
COPY ./public ./public
COPY ./mockServer ./mockServer
COPY ./public/assets/config/env/config.${ENVIRONMENT}.js ./public/assets/config/config.js

RUN yarn config set cache-folder $YARN_CACHE_FOLDER
RUN --mount=type=cache,sharing=shared,target=$YARN_CACHE_FOLDER \
    YARN_CACHE_FOLDER=$YARN_CACHE_FOLDER yarn install --pure-lockfile --link-duplicates --prefer-offline

RUN NODE_ENV=production yarn build

# Public webserver image
FROM nginx:stable-alpine as main

ARG PORT \
    ENVIRONMENT
ENV PORT=${PORT} \
    ENVIRONMENT=${ENVIRONMENT}

COPY --chown=nginx:nginx --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf && \
    mkdir -p /var/cache/nginx/client_temp /etc/nginx/templates && \
    touch /var/run/nginx.pid && \ 
    chown -R nginx.nginx  /var/run/nginx.pid && \
    chown -R nginx.nginx /var/cache/nginx && \
    chown -R nginx.nginx /var/log/nginx && \
    chown -R nginx.nginx /etc/nginx/conf.d

COPY --chown=nginx:nginx default.conf.template /etc/nginx/templates

WORKDIR /usr/share/nginx/html

EXPOSE ${PORT}

USER nginx

CMD ["nginx", "-g", "daemon off;"]
