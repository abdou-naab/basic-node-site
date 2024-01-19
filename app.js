const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

const fs = require("fs");
const path = require("path");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  let file_path = path.join(
    __dirname,
    req.url == "/" ? "index.html" : req.url + ".html"
  );

  fs.readFile(file_path, "utf-8", (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, "404.html"), "utf-8", (err, data) => {
        res.end(data, "utf-8");
      });
    } else res.end(data, "utf-8");
  });
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
