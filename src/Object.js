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
    
/**
 * Clone this object.
 * @returns a clone of this object
 */
Object.prototype.clone = function () {
    var clone = new this.constructor(); // make sure it is of the same kind
    var props = Object.getOwnPropertyNames(this);
    for (var i = 0; i < props.length; i++) {
        if (this[props[i]] instanceof Object) {
            clone[props[i]] = this[props[i]].clone();
        } else {
            clone[props[i]] = this[props[i]];
        }
    }
    return clone;
}

/**
 * Compare this object to another one.
 * @param obj an object to compare to this one
 * @returns a true if the object is identical, otherwise false
 */
Object.prototype.isIdenticalTo = function (obj) {
    // no even the same kind?
    if (this.constructor != obj.constructor) return false;
    
    // combine the props of both obj1 and obj2
    var props = Object.getOwnPropertyNames(this);
    props = props.concat(Object.getOwnPropertyNames(obj));
    props = props.filter(function(elem, pos) {
        // filter out identical properties
        return props.indexOf(elem) == pos;
    });

    // loop over the compined properties and recursively check for differeences
    for (var i = 0; i < props.length; i++) {
        if (this[props[i]] instanceof Object && obj[props[i]] instanceof Object) {
            var identical = this[props[i]].isIdenticalTo(obj[props[i]]);
            if (!identical) return false;
        } else {
            var identical = (this[props[i]] == obj[props[i]]);
            if (!identical) return false;
        }
    }

    // no differences found
    return true;
}

})();