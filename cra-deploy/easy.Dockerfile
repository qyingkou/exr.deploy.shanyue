FROM node:14-alpine
WORKDIR /code
# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json package-lock.json /code/
RUN npm ci --production --cache .npm --quiet --no-progress
ADD . /code
RUN npm run build
CMD npx serve -s build
EXPOSE 3000