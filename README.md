# Vanillin #

Vanillin is a JavaScript library that is very much like "Vanilla" JavaScript but API tweaks to make more sense.

This means it's quick, readable and familiar, as follows:

    document.getElementsBySelector("div.thumbnail > img").forEach(function () {
        this.addClass("unavailable");
        this.style.opacity = this.getComputedStyle("opacity") / 2;
    });
    
In jQuery this would look like:

    $("div.thumbnail > img").addClass("unavailable").css(function ({
        opacity: function (index, value) {
            return value / 2;
        }
    });

## HTTPRequest ##

As well as DOM interaction, Vanillin reshapes the XMLHttpRequest object as a new HTTPRequest object.

The HTTPRequest object makes synchronous calls as follows:

    var request = new HTTPRequest("http://api.randomuser.me/");
    request.isAsync = false;
    var response = request.send();
    console.log(response.json);

An asynchronous calls as follows:

    var request = new HTTPRequest("http://api.randomuser.me/");
    request.onComplete = function (status) {
        if (status == 200) { // OK
            console.log(request.getResponseBody().json);
        }
    };
    request.send();
