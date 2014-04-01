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
 * Add a class to this HTML element.
 * @param name the class name to add
 */
Element.prototype.addClass = function (name) {
    this.removeClass(name);
    this.className += " " + name;
    this.className = this.className.trim(); // keep things neat
};

/**
 * Has this HTML element a particular class?
 * @param name the class to check for
 * @returns true if this element has the class, otherwise false
 */
Element.prototype.hasClass = function (name) {
    if (this.className && this.className.length) {
        var regExp = new RegExp('(^|\\s)' + name + '($|\\s)');
        return regExp.test(this.className);
    } else {
        return false;
    }
};

/**
 * Remove a class from this HTML element.
 * @param name the class name to remove
 */
Element.prototype.removeClass = function (name) {
    // this will also neaten up the list of class names
    var classes = this.className.split(" ");
    classes = classes.filter(function (str) {
        return (str != "" && str != name);
    });
    this.className = classes.join(" ");
};

/**
 * Remove this HTML element from the DOM.
 */
Element.prototype.remove = function () {
    if (this.parentNode) {
        // NB: may not be appended to anything
        this.parentNode.removeChild(this);
    }
};

/**
 * Create and append a new HTML element to this one.
 * @param tag the tag name of the HTML element to append
 * @returns the newly appended HTML element
 */
Element.prototype.createChild = function (tag) {
    var el = document.createElement(tag);
    this.appendChild(el);
    return el;
};

/**
 * Get all the elements in this HTML element matching a CSS selector
 * NB: This is just a reference to .querySelectorAll for syntatic sugar.
 * @param selector a string representing a CSS selector
 * @returns an array of all matching HTML elements
 */
Element.prototype.getElementsBySelector = function () {
    return this.querySelectorAll.apply(this, arguments);
};

/**
 * Get the final cascading style for this HTML element, including inherited
 * and styles. Not supported on IE8.
 * @param name the name of the style to get
 * @param pseudo an optional pseudo class for the style (not supported on all browsers)
 * @returns the value of the style
 */
Element.prototype.getComputedStyle = function (name, pseudo) {
    return window.getComputedStyle(this, pseudo)[name];
};

})();