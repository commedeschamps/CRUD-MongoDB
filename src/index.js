//compiled typeScript in JavaScript

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var body_parser_1 = require("body-parser");
var cookie_parser_1 = require("cookie-parser");
var compression_1 = require("compression");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
var server = http_1.default.createServer(app);
app.listen(process.env.PORT, function () {
    console.log("Server is running on port ".concat(process.env.PORT));
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(process.env.MONGODB_URI || '');
