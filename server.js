require("dotenv").config();
const fs = require("fs");
const path = require("path");
const httpPort = process.env.VUE_APP_PORT;
const express = require("express");
const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", (req, res) => {
  fs.readFile(
    path.resolve(__dirname, "dist", "index.html"),
    "utf-8",
    (err, content) => {
      if (err) {
        return err;
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });

      res.end(content);
    }
  );
});

app.listen(httpPort, () => {
  console.log("Server listening on: http://localhost:" + httpPort);
});
