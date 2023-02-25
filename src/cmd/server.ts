import express from "express";

export const start = function (port) {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};
