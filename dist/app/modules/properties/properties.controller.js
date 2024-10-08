"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperties = exports.createProperty = void 0;
const properties_service_1 = require("./properties.service");
const createProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const properties = yield (0, properties_service_1.addPropertyToDb)(data);
    res.status(200).json({
        status: 'success',
        data: properties,
    });
});
exports.createProperty = createProperty;
const getProperties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield (0, properties_service_1.getPropertiesFromDb)();
    res.status(200).json({
        status: 'success',
        data: properties,
    });
});
exports.getProperties = getProperties;
