# exr.deploy.shanyue

部署专项练习

基于 docker 学习 nginx 配置

## 配置 index.html 的 http 缓存策略

- http 缓存
- service worker 缓存

## 配置 gzip/brotli

(todo)

## 单页的构建和打包

1.提升构建速度。利用 Dockerfile 的 ADD 指令如果添加文件内容的 checksum 没有发生变化，则可以利用构建缓存提升 npm ci 的速度。也就是说当 package.json、package_lock.json 文件内容没有变更，则 npm i 的时间可以省了。  
2.减少镜像体积。使用多阶段构建即使用最后一个阶段作为镜像基础，其余阶段仅仅为其提供构建资源。
示范：

- easy.Dockerfile 未使用多阶段构建，基础镜像是 node:alpine，大小 200M
- simple.Dockerfile 使用了多阶段构建，基础镜像是 nginx:alpine,大小 20M

## 加入前端路由

首先项目构建和 docker 打包后运行肯定会有问题，因为新添加的路由是前端路由，静态服务中是按照资源路径去找的。因此需要写rewrite

