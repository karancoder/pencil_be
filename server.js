import express, { json } from "express";
import questionRouter from "./routes/questions.js";
import topicRouter from "./routes/topics.js";
import queryRouter from "./routes/queries.js";

import pkg from "mongoose";
const { mongoose } = pkg;
var url ="mongodb+srv://pencil_be:pencil_be@pencilbeproject.8wvex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(json());
app.use("/questions", questionRouter);
app.use("/topics", topicRouter);
app.use("/search", queryRouter);

app.get("/", (req, res) => {
    res.send("Landing Page!");
});

app.listen(process.env.PORT || 3000, () => console.log("Server ready"));
