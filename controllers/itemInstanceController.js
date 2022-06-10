const { body, validationResult } = require("express-validator");
const async = require("async");

const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");

exports.iteminstance_list = function (req, res, next) {
  ItemInstance.find()
    .populate("item")
    .exec(function (err, list_iteminstances) {
      if (err) {
        return next(err);
      }

      res.render("iteminstance_list", {
        title: "Item Instance List",
        iteminstance_list: list_iteminstances,
      });
    });
};

exports.iteminstance_detail = function (req, res, next) {
  ItemInstance.findById(req.params.id)
    .populate("item")
    .exec(function (err, iteminstance) {
      if (err) {
        return next(err);
      }
      if (iteminstance == null) {
        // No results.
        var err = new Error("Item copy not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("iteminstance_detail", { iteminstance: iteminstance });
    });
};

exports.iteminstance_create_get = function (req, res, next) {};

exports.iteminstance_create_post = function (req, res, next) {
  let iteminstance = new ItemInstance({
    item: req.body.id,
    acquired: new Date(),
    crafted: false,
  });

  iteminstance.save(function (err) {
    if (err) {
      return next(err);
    }
  });
  
  res.send(200, {item_instance: iteminstance});
};

exports.iteminstance_update_get = function (req, res, next) {};

exports.iteminstance_update_post = function (req, res, next) {};

exports.iteminstance_delete_get = function (req, res, next) {};

exports.iteminstance_delete_post = function (req, res, next) {};
