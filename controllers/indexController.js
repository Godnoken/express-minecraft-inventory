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

exports.item_search = [
    
    body('search_item').trim().isLength({ min: 1 }).escape(),
    
    (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.

        return;
    } else {
        Item.find({ "name": { $regex: req.body.search_item, $options : "i" } })
        .populate("inventor")
        .populate("type")
        .exec(function (error, list_items) {
            if (error) { return next(error) }

            res.render("index", { title: "Item List", item_list: list_items });
        })
    }
}];