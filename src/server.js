const http = require("node:http");
const fsp = require("node:fs/promises");
const fs = require("node:fs");
const path = require("node:path");

const filepath = path.resolve(__dirname, "./index.html");

function errHandler(err) {
  res.end();
  console.error(err.message);
}
const server = http.createServer(async (req, res) => {
  if (req.url.includes("favicon.ico")) {
    res.end();
    return;
  }
  // 1.非流式响应：读完文件后再响应，慢
  // const html = await fsp.readFile(path.resolve(__dirname, "./index.html"));
  // res.end(html);
  // 2.流式响应：一边读一边响应，快
  let size;
  try {
    size = fs.statSync(filepath).size;
  } catch (err) {
    errHandler(err);
  }
  res.setHeader("Content-Length", size);
  const reader = fs.createReadStream(filepath);
  // 2.1 基于事件的方式
  // reader
  //   .on("data", (chunk) => {
  //     res.write(chunk);
  //   })
  //   .on("end", () => {
  //     res.end();
  //   })
  //   .on("error", (err) => {
  //     console.error("error:", err.message);
  //     res.end();
  //   });
  // 2.2 基于管道连接方法，将读流连接到写流中去，内部自动处理。
  reader.pipe(res);
});
server.listen(3000, () => console.log("server started,listening 3000 port!"));
