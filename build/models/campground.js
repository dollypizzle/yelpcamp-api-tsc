"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var campgroundSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });
var Campground = mongoose_1.model('Campground', campgroundSchema);
exports.default = Campground;
