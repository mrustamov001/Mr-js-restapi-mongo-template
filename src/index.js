const express = require("express");
const userRouter = require("./modules/users/_api");
const handle = require("./shared/errors/handle");
const db = require("./db");
const config = require("./shared/config");

const app = express();

app.use(express.json());

app.use(userRouter);

app.use(handle);

db();
app.listen(config.port, () => {
    console.log(`listening on http://${config.db.host}:${config.port}`);
});
