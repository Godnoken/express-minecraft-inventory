const { body, validationResult } = require("express-validator");
const async = require("async");

const Inventor = require("../models/inventor");
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");
const Type = require("../models/type");

exports.index = function (req, res) {
  async.parallel(
    {
      inventors_list: function (callback) {
        Inventor.find()

        .exec(callback);
      },
      item_list: function (callback) {
        Item.find()
        .populate("inventor")
        .populate("type")
        .exec(callback);
      },
      item_instances_list: function (callback) {
        ItemInstance.find()
        
        .exec(callback);
      },
    },
    function (error, results) {
      if (error) {
        return next(error);
      }
      
      res.render("index", { title: "Item List", inventors_list: results.inventors_list, item_list: results.item_list, item_instances_list: results.item_instances_list });
    }
  );
};