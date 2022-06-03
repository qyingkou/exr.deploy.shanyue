# 简单部署

适合用在开发环境或者了解其原理
这里罗列一些关键点：

## http 知识

- Transfer-Encoding 实体传输编码，会对报文分片的格式产生影响。
  [特性文档在这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)  
  Transfer-Encoding: gzip, chunked，如果有多个值使用逗号分隔  
  chunked 模式下的报文体结构见文档，分片大小由工具自动产生，分片内容之间不再有分隔符和分片大小标识，这是 nodejs 的 stream 默认的一种形式，使用场景多在不知道 stream 内容长度的情况下。  
  我们一但添加了 Content-Length，那 chunked 就失效，分片内容之间不再有分隔符和分片大小标识，我们称之为非 chunked 模式。  
  chunked 比非 chunked 报文体要大，我们在可能的情况下尽量选择后者。
  通常来说，服务端要尽量提供给前端 Content-Length,这样可以更好支撑交互体验。像静态资源这类内容请求，能够拿到内容长度的就采取非 chunked 这种结构。
- Content-Encoding 内容实体编码，以获得更小的报体。
  [特性文档在这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding)
  像压缩文件这类无法再被压缩的文件，设置后反而影响了性能，一定不要去设置。
