# 静态服务器

## 作业要求

（待续...)
继续完善静态服务器，使其作为一个命令行工具来使用  
参考 [serve-handler](https://github.com/vercel/serve-handler)）

## 可能用到的第三方依赖

- globs 匹配：https://github.com/isaacs/minimatch
- path 字符串 转正则：https://github.com/pillarjs/path-to-regexp

## 功能点介绍

### public： String

公共资源文件夹的指定。

working directory 指命令行工具指定的路径；
public 则可以对工作目录进行重新指定，可以根据该路径进行相对偏移（相对路径），或者使用绝对路径；

### http 输出模版类型

按照业务分为：

静态资源、目录列表（右侧可预览）、404 页面

### CleanUrls： Boolean|Array

字面意思：url 变干净。
即当你以/path/to/a.html 来访问资源时，若该位置存在 a.html 资源，则会以 301 方式 跳转到/path/to/a  
Boolean 类型时，true（默认）只支持.html，false 时不跳转；
Array 类型时，匹配的后缀会有跳转行为。

### Rewrite

路由映射关系的重写机制
平常下，路由机制会映射到唯一的 path，但有时候你想打破映射关系，于是需要一种重写机制
支持 routing segment 语法`:<id>`和 globs 匹配

```json
{
  "rewrites": {
    "app/**": "/index.html",
    "projects/*/edit": "/edit-project.html",
    "/projects/:id/edit": "/edit-project-:id.html"
  }
}
```

### redirects

将路由转发到不同的路由或外部 URL

By default, all of them are performed with the status code 301

```json
{
  "redirects": {
    "/from": "/to",
    "/old-pages/**": "/home"
  }
}
```

use routing segment and custom status code 302

```json
{
  "redirects": {
    "/old-docs/:id": "/new-docs/:id",
    "/old": ["/new", 302]
  }
}
```

### headers

特定 path 的特定头部

If you define the ETag header for a path, the handler will automatically reply with status code 304 for that path if a request comes in with a matching If-None-Match header.

If you set a header value to null it removes any previous defined header with the same key

```json
"headers":{
  "**/*.@(jpg|jpeg|gif|png)":[{"Cache-Control":"max-age=7200"}],
  "404.html":[{"Cache-Control":"max-age=300"}]
}
```

### directoryListing

```json
{
  "directoryListing": ["/assets/**", "/!assets/private"],
  "unlisted": [".DS_Store", ".git"]
}
```

### trailingSlash 尾斜杠

```json
{
  "trailingSlash": true
}
```

a request to /test would now result in a 301 redirect to /test/

### renderSingle

渲染唯一的元素：如果访问的文件夹中仅含有一个文件，那么将这个文件以可视化方式呈现

```json
{
  "renderSingle": true
}
```

### symlinks

出于安全目的，默认情况下禁用符号链接。如果服务处理程序遇到符号链接，它会将其视为不存在。
而如果以该路径访问将呈现 404 错误。

设置 true，所有符号链接将自动解析为其目标。

```json
{
  "symlinks": true
}
```

### etag

HTTP 响应标头将包含一个强 ETag 响应标头，而不是 Last-Modified  
默认情况下，发送 ETag 标头是禁用的,因为对于大型文件，计算哈希值的计算成本可能会很高。可以自行打开。

```json
{
  "etag": true
}
```

### Error templates

为特定的错误指定模版，默认情况下会去寻找 根目录下的\<statusCode>.html 文件,你也可以指定：

```json
{
  "errorTemplates": {
    "./tpl/notFound.html": [404, 401, 402, 403],
    "./tpl/serveError.html": "5??"
  }
}
```

## 最后，option 参数设计

--help -h
--port -p
