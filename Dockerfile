# stage1 - build react app first 
FROM node:15.4.0-alpine3.10 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY env.sh .
RUN chmod +x env.sh
RUN yarn --silent
COPY . /app
RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.19.5-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["/bin/bash", "-c", "/app/env.sh && nginx -g \"daemon off;\""]
