const { body, validationResult } = require('express-validator');
const async = require('async');

const Inventor = require("../models/inventor");
const Item = require("../models/item");
const ItemInstance = require('../models/iteminstance');
const Type = require("../models/type");

exports.type_list = function(req, res, next) {

    Type.find()
    .sort([["name", "ascending"]])
    .exec((error, list_types) => {
      if (error) {
        return next(error);
      }

      res.render("type_list", {
        title: "Types List",
        type_list: list_types,
      });
    });
};

exports.type_detail = function(req, res, next) {
    
    async.parallel({
        type: function(callback) {
            Type.findById(req.params.id)
              .exec(callback);
        },

        type_items: function(callback) {
            Item.find({ 'type': req.params.id })
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.type==null) { // No results.
            var err = new Error('Type not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('type_detail', { title: 'Type Detail', type: results.type, type_items: results.type_items } );
    });
};

exports.type_create_get = function(req, res, next) {

};

exports.type_create_post = function(req, res, next) {

};

exports.type_update_get = function(req, res, next) {

};

exports.type_update_post = function(req, res, next) {

};

exports.type_delete_get = function(req, res, next) {

};

exports.type_delete_post = function(req, res, next) {

};