const { body, validationResult } = require('express-validator');
const async = require('async');

const Inventor = require("../models/inventor");
const Item = require("../models/item");
const ItemInstance = require('../models/iteminstance');
const Type = require("../models/type");

exports.item_list = function(req, res, next) {

    Item.find()
        .populate("inventor")
        .exec(function (error, list_items) {
            if (error) { return next(error) }

            res.render("item_list", { title: "Item List", item_list: list_items });
        })
};

exports.item_detail = function(req, res, next) {

    async.parallel({
        item: function(callback) {
            Item.findById(req.params.id)
                .populate("inventor")
                .populate("type")
                .populate("craftingMaterials")
                .exec(callback);
        },
        item_instances: function(callback) {
            ItemInstance.find({ "item": req.params.id })
                .exec(callback);
        }
    },
    function(error, results) {
        if (error) { return next(error) }
        if (results.item == null) {
            const error = new Error("Item not found");
            error.status = 404;
            return next(error);
        }

        res.render("item_detail", { item: results.item, item_instances: results.item_instances })
    }
    )
};

exports.item_create_get = function(req, res, next) {

};

exports.item_create_post = function(req, res, next) {

};

exports.item_update_get = function(req, res, next) {

};

exports.item_update_post = function(req, res, next) {

};

exports.item_delete_get = function(req, res, next) {

};

exports.item_delete_post = function(req, res, next) {

};