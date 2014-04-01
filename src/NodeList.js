/*
    The MIT License (MIT)

    Copyright (c) 2014 Oliver Moran

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
    of the Software, and to permit persons to whom the Software is furnished to do
    so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

(function(){
    
// IE8
var CompromiseNodeList = (typeof StaticNodeList == "undefined") ? NodeList : StaticNodeList;

/**
 * Loop over this node list as if it was an array
 * @param callback a function to call for each item in this node list
 * @param thisArg (optional) the value to use as this when calling callback
 */
CompromiseNodeList.prototype.forEach = function(fun /*, thisArg */) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
    "use strict";
    
    if (this === void 0 || this === null) throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    
    if (typeof fun !== "function") throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
        if (i in t) fun.call(thisArg, t[i], i, t);
    }
};

/*
NodeList.prototype.toSource = function () {};
NodeList.prototype.toString = function () {};
NodeList.prototype.toLocaleString = function () {};
NodeList.prototype.join = function () {};
NodeList.prototype.reverse = function () {};
NodeList.prototype.sort = function () {};
NodeList.prototype.push = function () {};
NodeList.prototype.pop = function () {};
NodeList.prototype.shift = function () {};
NodeList.prototype.unshift = function () {};
NodeList.prototype.splice = function () {};
NodeList.prototype.concat = function () {};
NodeList.prototype.slice = function () {};
NodeList.prototype.lastIndexOf = function () {};
NodeList.prototype.indexOf = function () {};
NodeList.prototype.map = function () {};
NodeList.prototype.reduce = function () {};
NodeList.prototype.reduceRight = function () {};
NodeList.prototype.filter = function () {};
NodeList.prototype.some = function () {};
NodeList.prototype.every = function () {};
NodeList.prototype.find = function () {};
NodeList.prototype.findIndex = function () {};
NodeList.prototype.entries = function () {};
NodeList.prototype.keys = function () {};
NodeList.prototype.shuffle = function () {};
NodeList.prototype.removeDuplicates = function () {};
*/
    
})();