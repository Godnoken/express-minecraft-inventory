const { body, validationResult } = require('express-validator');
const async = require('async');

const Inventor = require("../models/inventor");
const Item = require("../models/item");
const ItemInstance = require('../models/iteminstance');
const Type = require("../models/type");

exports.index = function(req, res) {

    Item.find()
    .populate("inventor")
    .populate("type")
    .exec(function (error, list_items) {
        if (error) { return next(error) }

        res.render("index", { title: "Item List", item_list: list_items });
    })
};