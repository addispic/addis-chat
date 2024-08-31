require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// socket
const { server, app } = require("./api/socket/socket");

// db connection
const dbConnectionHandler = require("./api/db/db.connection");

// port
const PORT = process.env.PORT || 5050;

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// routes
// user
app.use("/api/user", require("./api/routes/user.routes"));
// post
app.use("/api/post", require("./api/routes/post.routes"));
// profiles
app.use("/api/profile", require("./api/routes/profile.routes"));

// public
app.use("/public", express.static("public"));

// listen
server.listen(PORT, async () => {
  await dbConnectionHandler();
  console.log("server listening...");
});
