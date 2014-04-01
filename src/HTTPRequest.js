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

// expose the constructor on the window object
window.HTTPRequest = function (url, method, user) {
    HTTPRequestConstructor.apply(this, arguments);
};

/**
 * Constructor for a HTTPRequest object
 * @param url the URL the request will be sent to
 * @param method (optional) the HTTP request mothod to use 
 *        (e.g. GET, POST, PUT, DELETE). Defaults to GET.
 * @params user (optional) an object containing a username/password, like:
 *        { user: "jbloggs", password: "p455w0rd" }
 */
function HTTPRequestConstructor(url, method, user) {
    if (typeof url == "string") {
        this.url = url;
    } else {
        throw new TypeError("HTTPRequest URL must be a string.");
    }
    
    var _methods = ["GET", "POST", "PUT", "DELETE"];
    
    if (typeof method == "string") {
        if (_methods.indexOf(method.toString().toUpperCase()) == -1) {
            console.warn("HTTPRequest methods should normally be one of GET, POST, PUT or DELETE.");
        }
        this.method = method.toUpperCase();
    } if (typeof method == "undefined") {
        this.method = _methods[0];
    } else {
        throw new TypeError("HTTPRequest method must be a string.");
    }
    
    if (typeof user == "object") {
        this.user = user.user;
        this.password = user.password;
    } if (typeof user != "undefined") {
        throw new TypeError("HTTPRequest user/password must be an object like { user: \"jbloggs\", password: \"p455w0rd\" }.");
    }
    
    this.__XMLHttpRequest__ = new XMLHttpRequest();
};

// a user name to send with requests
HTTPRequest.prototype.user;

// a password to send with requests
HTTPRequest.prototype.password;
    
// is the request asynchronous, defaults to true
HTTPRequest.prototype.isAsync = true;
    
// should a blob be expected as the response, defaults to false
HTTPRequest.prototype.expectBlob = false;

// timeout for the request in miliseconds, or 0 for no timeout, defaults to 0
HTTPRequest.prototype.timeout = 0;

// a method to call on completions of the request, irrespect of the HTTP status
HTTPRequest.prototype.onComplete;
    
// a method to call on timeout of the request
HTTPRequest.prototype.onTimeout;
    
/**
 * Set a header for the request
 * @param header the header to set
 * @param value the the header should be set to
 */
HTTPRequest.prototype.setHeader = function (header, value) {
    this.__XMLHttpRequest__.setRequestHeader(header, value);
};

/**
 * Overrides the MIME type returned by the server.
 * For example, to force a stream to be treated and parsed as text/xml.
 * @param mimetype the MIME type to force
 */
HTTPRequest.prototype.overrideMimeType = function (mimetype) {
    this.__XMLHttpRequest__.overrideMimeType(mimetype);
};

/**
 * Send a request to the server
 * @param payload (optional) FormData, blob data, string, XML to 
 *        send to the server with the request
 * @returns a response object if the request is synchronous, otherwise void
 */
HTTPRequest.prototype.send = function (payload) {
    this.__XMLHttpRequest__.timeout = this.timeout;
    this.__XMLHttpRequest__.withCredentials = this.withCredentials;
    this.__XMLHttpRequest__.open(this.method, this.url, this.isAsync, this.user, this.password);

    if (this.expectBlob) {
        this.__XMLHttpRequest__.responseType = "blob";
    }
    
    this.__XMLHttpRequest__.send(payload);
    
    if (this.isAsync) {
        var that = this;
        this.__XMLHttpRequest__.onreadystatechange = function(){
            _onReadyStateChange.call(that);
        };
        this.__XMLHttpRequest__.ontimeout = _onTimeout;
        // FIXME: need to add support for upload events
    } else {
        return this.getResponseBody();
    }
};

// handles state changes and eventually calls the onComplete method
function _onReadyStateChange() {
    switch (this.__XMLHttpRequest__.readyState) {
        case 0: // request not initialized
            break;
        case 1: // server connection established
            break;
        case 2: // request received
            break;
        case 3: // processing request
            break;
        case 4: // request finished and response is ready
            if (typeof this.onComplete == "function") {
                this.onComplete.call(this, this.__XMLHttpRequest__.status);
            }
            break;
    }
}

// calls the onTimeout method
function _onTimeout() {
    if (typeof this.onTimeout == "function") {
        this.onTimeout.call(this);
    }
}
    
/**
 * Abort a current request
 */
HTTPRequest.prototype.abort = function () {
    this.__XMLHttpRequest__.abort();
};

/**
 * Get the content of a header from the response
 * @param header the header to get
 * @returns the content of the header
 */
HTTPRequest.prototype.getResponseHeader = function (header) {
    return this.__XMLHttpRequest__.getResponseHeader(header);
};

/**
 * Get all of the response headers as a single string
 * @returns all of the reponse headers as a single string
 */
HTTPRequest.prototype.getResponseHeaders = function () {
    return this.__XMLHttpRequest__.getAllResponseHeaders();
};

/**
 * Get the response body as an object in the form:
 * @returns an object of the kind:
 *          { text: ..., xml: ..., json: ..., blob: ...}
 *          Any of the properties may be null if the response
 *          cannot be parsed as an object of this kind.
 */
HTTPRequest.prototype.getResponseBody = function () {
    var text, xml, json, blob = null;
    
    if (this.expectBlob) {
        blob = this.__XMLHttpRequest__.response;
    } else {
        try { json = JSON.parse(this.__XMLHttpRequest__.responseText); }
        catch (err) { /* meh */ }
        text = this.__XMLHttpRequest__.responseText;
        xml = this.__XMLHttpRequest__.responseXML;
    }
    
    return {
        text: text,
        xml: xml,
        json: json,
        blob: blob
    }
}

})();
