"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseDB = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
class PromiseDB {
    constructor() {
        this.initialized = false;
        this.initialize = () => {
            if (this.initialized) {
                return Promise.resolve(true);
            }
            return this.db
                .open()
                .then(() => this.db.run("CREATE TABLE promise (id INTEGER PRIMARY KEY, desc CHAR);")
                .then(() => (this.initialized = true)));
        };
        this.create = (payload) => this.db.run("INSERT INTO promise (desc) VALUES (?);", payload.desc);
        this.delete = (id) => this.db.run("DELETE FROM promise WHERE id = ?", id);
        this.getAll = () => this.db.all("SELECT * FROM promise");
        this.getOne = (id) => this.db.get("SELECT * FROM promise WHERE id = ?", id);
        this.update = (payload) => this.db
            .run("UPDATE promise SET desc = ? where id = ?", payload.desc, payload.id);
        this.db = new sqlite_1.Database({
            driver: sqlite3_1.default.Database,
            filename: ":memory:",
        });
    }
}
exports.PromiseDB = PromiseDB;
