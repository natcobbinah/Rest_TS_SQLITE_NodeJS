"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_1 = require("http");
const db_1 = require("./db");
const router_1 = require("./router");
class App {
    constructor(port) {
        this.port = port;
        this.initialize = () => {
            return Promise.all([
                this.db.initialize(),
                new Promise((resolve) => this.server.listen(this.port, () => resolve(true)))
            ]).then(() => console.log("Application is ready!"));
        };
        this.requestHandler = (req, res) => {
            var _a, _b;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "*");
            res.setHeader("Access-Control-Allow-Methods", "DELETE, GET, OPTIONS, POST, PUT");
            if (req.method === "OPTIONS") {
                return res.end();
            }
            const urlParts = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")) !== null && _b !== void 0 ? _b : "/";
            switch (urlParts[1]) {
                case "promise":
                    return (0, router_1.promiseRouter)(req, res);
                default:
                    return this.handleError(res, 404, "Not Found");
            }
        };
        this.handleError = (res, statusCode = 500, message = "Internal Server Error.") => res.writeHead(statusCode).end(message);
        this.db = new db_1.PromiseDB();
        this.server = (0, http_1.createServer)(this.requestHandler);
    }
}
exports.app = new App(3000);
exports.app.initialize();
