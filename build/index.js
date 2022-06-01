"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var user_1 = require("./routes/user");
var campground_1 = require("./routes/campground");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = process.env.PORT;
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(user_1.userRouter);
app.use(campground_1.campgroundRouter);
mongoose_1.default.connect("" + process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
app.listen(port, function () {
    console.log("Server is up on port " + port);
});
