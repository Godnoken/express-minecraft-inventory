const { body, validationResult } = require('express-validator');
const async = require('async');

exports.index = function(req, res) {

    res.render('index', { title: 'Minecraft Inventory Hub' });
};