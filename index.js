/*jshint node:true */

"use strict";
var Minifier = require('html-minifier');

module.exports = function Minify(req, res, next) {
    var render = res.render;
    res.render = function(view, options) {
        render(view, options, function(err, html) {
            if (err) {
            	throw err;
            }
            html = Minifier.minify(html, {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true
            });
            res.send(html);
        });
    };
    next();
};