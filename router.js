"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseRouter = void 0;
const app_1 = require("./app");
const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            }
            catch (e) {
                reject(e);
            }
        });
    });
};
const handleCreate = (req, res) => parseBody(req)
    .then((body) => app_1.app.db.create(body)
    .then(() => res.end()))
    .catch((err) => app_1.app.handleError(res, 500, err.message));
const handleDelete = (requestParam, res) => app_1.app.db.delete(requestParam)
    .then(() => res.end())
    .catch((err) => app_1.app.handleError(res, 500, err.message));
const handleGetOne = (requestParam, res) => app_1.app.db.getOne(requestParam)
    .then((data) => res.end(JSON.stringify(data)))
    .catch((err) => app_1.app.handleError(res, 500, err.message));
const handleGetAll = (res) => app_1.app.db.getAll()
    .then((data) => res.end(JSON.stringify(data)))
    .catch((err) => app_1.app.handleError(res, 500, err.message));
const handleUpdate = (req, res) => parseBody(req)
    .then((body) => app_1.app.db.update(body).then(() => res.end()))
    .catch((err) => app_1.app.handleError(res, 500, err.message));
const promiseRouter = (req, res) => {
    var _a, _b;
    const urlParts = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")) !== null && _b !== void 0 ? _b : "/";
    const requestParam = urlParts[2];
    res.setHeader("Content-Type", "application/json");
    switch (req.method) {
        case "DELETE":
            if (requestParam) {
                return handleDelete(Number.parseInt(requestParam), res);
            }
        case "GET":
            if (requestParam) {
                return handleGetOne(Number.parseInt(requestParam), res);
            }
            return handleGetAll(res);
        case "POST":
            return handleCreate(req, res);
        case "PUT":
            return handleUpdate(req, res);
        default:
            app_1.app.handleError(res, 404, "Not Found");
    }
};
exports.promiseRouter = promiseRouter;
