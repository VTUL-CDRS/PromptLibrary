"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var port = 8000;
// Make the express object
var app = (0, express_1.default)();
// Routes
var tagRoute = require("./routes/tag");
app.use('/tag', tagRoute);
var accountRoute = require("./routes/account");
app.use('/account', accountRoute);
var searchRoute = require("./routes/search");
app.use('/search', accountRoute);
var prompt = require("./routes/search");
app.use('/prompt', accountRoute);
// Basic get
app.get("/", function (_, res) {
    res.send("HELLO");
});
// Start listening on the port
app.listen(port, function () {
    console.log("now listening on port ".concat(port));
});
//# sourceMappingURL=server.js.map