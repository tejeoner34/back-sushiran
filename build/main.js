"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./mvc/router"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
var allowedOrigins = ['http://localhost:3000'];
var options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.urlencoded({ extended: false }));
var PORT = process.env.PORT || 3001;
app.use('/reservations', router_1.default);
app.listen(PORT, function () {
    console.log('server on');
});
