module("HTTPRequest", {
    setup: function() {
    },
    teardown: function () {
    }
});

test("HTTPRequest (synchronous)", function() {
    var request = new HTTPRequest("http://api.randomuser.me/");
    request.isAsync = false;
    request.send();

    ok(typeof request.getResponseBody().text == "string", "Response text is a string");
    ok(typeof request.getResponseBody().json == "object", "Response JSON is an object");
});

asyncTest("HTTPRequest (asynchronous)", function() {
    var request = new HTTPRequest("http://api.randomuser.me/");
    expect(2);
    
    request.onComplete = function (status) {
        if (status == 200) {
            ok(typeof request.getResponseBody().text == "string", "Response text is a string");
            ok(typeof request.getResponseBody().json == "object", "Response JSON is an object");
            start();
        }
    };
    request.send();
});