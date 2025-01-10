import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import main from "./langflow.js";
import { readFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/api/data", (req, res) => {
    const filePath = path.join(__dirname, "data", "social_metric.csv");
    readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send(data);
    });
});

app.get("/api/chatbot", (req, res) => {
    const query = req.query.query;
    console.log("Query:", query);
    if (!query) {
        return res.status(400).send("Query parameter is required");
    }
    main(query)
        .then((response) => {
            console.log("Response:", response);
            res.json(response);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
