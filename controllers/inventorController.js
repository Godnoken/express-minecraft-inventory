const { body, validationResult } = require('express-validator');
const async = require('async');

const Inventor = require("../models/inventor");
const Item = require("../models/item");

exports.inventor_list = function(req, res, next) {

    Inventor.find()
      .sort([['name', 'ascending']])
      .exec(function (err, list_inventors) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('inventor_list', { title: 'Inventor List', inventor_list: list_inventors });
      });
};

exports.inventor_detail = function(req, res, next) {

    async.parallel({
        inventor: function(callback) {
            Inventor.findById(req.params.id)
              .exec(callback)
        },
        inventors_items: function(callback) {
          Item.find({ 'inventor': req.params.id }, 'name description')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.inventor==null) { // No results.
            var err = new Error('Inventor not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('inventor_detail', { title: 'Inventor Detail', inventor: results.inventor, inventor_items: results.inventors_items } );
    });
};

exports.inventor_create_get = function(req, res, next) {

};

exports.inventor_create_post = function(req, res, next) {

};

exports.inventor_update_get = function(req, res, next) {

};

exports.inventor_update_post = function(req, res, next) {

};

exports.inventor_delete_get = function(req, res, next) {

};

exports.inventor_delete_post = function(req, res, next) {

};