"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var port = 8080;
// Make the express object
var app = (0, express_1.default)();
// Allow json body requests
// Adds middleware which parses the requests coming in
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Routes
var tagRoute = require("./routes/tag");
app.use('/tag', tagRoute);
var accountRoute = require("./routes/account");
app.use('/account', accountRoute);
var promptRoute = require("./routes/prompt");
app.use('/prompt', promptRoute);
var llmRoute = require("./routes/llm");
app.use('/llm', llmRoute);
var searchRoute = require("./routes/search");
app.use('/search', searchRoute);
var exportRoute = require("./routes/export");
app.use('/export', exportRoute);
// Basic get
app.get("/", function (_, res) {
    res.send("HELLO");
});
// Start listening on the port
app.listen(port, function () {
    console.log("now listening on port ".concat(port));
});
//# sourceMappingURL=server.js.map