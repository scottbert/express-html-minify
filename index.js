/*jshint node:true */

"use strict";
var minifier = require('html-minifier').minify;

module.exports = function (opts) {
	return function Minify(req, res, next) {
		var options = opts || {};
		var isHtmlRequest = (req.headers.accept.indexOf('text/html') !== -1);
		if (isHtmlRequest) {
		    var write = res.write.bind(res);
		    var end = res.end.bind(res);
		    var chunks = [];
		    res.write = function (chunk) {
		        chunks.push(chunk);
		    };
		    res.end = function (chunk) {
		        if (chunk) {
		            chunks.push(chunk);
		        }
		        var ret = minifier(chunks.join(''), options);
		        res.setHeader('content-length', ret.length);
		        end(ret);
		    };
		}
		next();
	};
};