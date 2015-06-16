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
		        write(chunk);
		    };
		    res.end = function (chunk, encoding) {
		        if (chunk) {
		            chunks.push(chunk);
		        }
		        var body = minifier(chunks.join(''), options);
		        var len = Buffer.byteLength(body, 'utf8');
		        if (len) {
		        	res.setHeader('Content-Length', len);
		        }
		        end(body, encoding);
		        res.write = write;
		        res.end = end;
		    };
		}
		next();
	};
};