"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = exports.propertySchema = void 0;
const mongoose_1 = require("mongoose");
//using schema
exports.propertySchema = new mongoose_1.Schema({
    img: { type: String, required: true },
    isSold: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    price: { type: Number, required: true },
    details: { type: String, required: true },
    category: { type: String, enum: ['sell', 'rent'], required: true },
    propertyDetails: {
        category: {
            type: String,
            enum: ['building', 'house', 'apartment', 'condominium'],
            required: true,
        },
        totalRooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
    },
    location: { type: String, required: true },
    propertySize: { type: Number, required: true },
});
//model
exports.Property = (0, mongoose_1.model)('Property', exports.propertySchema);
