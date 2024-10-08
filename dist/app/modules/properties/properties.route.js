"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const properties_controller_1 = require("./properties.controller");
const router = express_1.default.Router();
router.get('/', properties_controller_1.getProperties);
router.post('/create-property', properties_controller_1.createProperty);
exports.default = router;
