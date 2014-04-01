module("Document", {
    setup: function() {
        for (var i = 0; i < 10; i++) {
            var span = document.createElement("span");
            span.setAttribute("id", "span" + i);
            span.setAttribute("class", "getElementsBySelectorTestSpan");
            fixture.appendChild(span);
        }
    },
    teardown: function () {
        for (var i = 0; i < 10; i++) {
            var span = document.getElementById("span" + i);
            span.parentNode.removeChild(span);
        }
    }
});

test( "Document.prototype.getElementsBySelector", function() {
    var nodeList = document.getElementsBySelector("span[class='getElementsBySelectorTestSpan']");

    ok( nodeList.constructor == CompromiseNodeList, "Returns an NodeList" );
    ok( nodeList.length == 10, "Returns 10 objects" );
});
