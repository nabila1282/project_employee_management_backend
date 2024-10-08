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
exports.getPropertiesFromDb = exports.addPropertyToDb = void 0;
const properties_model_1 = require("./properties.model");
const addPropertyToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield new properties_model_1.Property(payload);
    // const property =await new Property({
    // img: 'https://unsplash.com/photos/XbwHrt87mQ0',
    // isSold: false,
    // admin: false,
    // price: 100000,
    // details: 'Sundor onek',
    // category: 'rent',
    // propertyDetails: {
    //     category: 'house',
    //     totalRooms: 6,
    //     bathrooms: 3,
    //     bedrooms: 4,
    // },
    // location: '123 Main St, City, State',
    // propertySize: 2000,
    // })
    yield property.save();
    console.log(property);
    return property;
});
exports.addPropertyToDb = addPropertyToDb;
// addPropertyToDb();
const getPropertiesFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield properties_model_1.Property.find();
    return properties;
});
exports.getPropertiesFromDb = getPropertiesFromDb;
