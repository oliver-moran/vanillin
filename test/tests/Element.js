module("Element", {
    setup: function() {
        var span = document.createElement("span");
        span.setAttribute("id", "span");
        fixture.appendChild(span);
    },
    teardown: function () {
        var span = document.getElementById("span");
        span.parentNode.removeChild(span);
    }
});

test( "Element.prototype.addClass", function() {
    var span = document.getElementById("span");

    span.addClass("someClass");
    ok( span.className == "someClass", "Add a class I" );
    
    span.addClass("anotherClass");
    ok( span.className == "someClass anotherClass", "Add a class II" );
});

test( "Element.prototype.hasClass", function() {
    var span = document.getElementById("span");
    span.className = "someClass anotherClass";
    
    ok( span.hasClass("someClass") === true, "Has a class" );
    ok( span.hasClass("someOtherClass") === false, "Hasn't a class" );
});

test( "Element.prototype.removeClass", function() {
    var span = document.getElementById("span");
    span.className = "someClass anotherClass";
    
    span.removeClass("anotherClass");
    ok( span.className == "someClass", "Remove a class I" );
    
    span.removeClass("someClass");
    ok( span.className == "", "Remove a class II" );
});

test( "Element.prototype.createChild", function() {
    var span = document.getElementById("span");
    
    var span2 = span.createChild("span");
    span2.setAttribute("id", "span2");
    span2.setAttribute("class", "span2-class");
    
    ok( span2.parentNode == span, "Append a new node" );
    ok( span2.id == "span2", "New node has the right ID" );
    ok( span2.className == "span2-class", "New node has the right class" );
});

test( "Element.prototype.remove", function() {
    var span = document.getElementById("span");
    
    var span2 = document.createElement("span");
    span2.setAttribute("id", "span2");
    span2.setAttribute("class", "myClass myClass2");
    span.appendChild(span2);

    ok( span2.parentNode == span, "One span is the child of another" );
    span2.remove();
    ok( span2.parentNode != span, "Now it's not (Elements can remove themselves)" );
});

test( "Element.prototype.getElementsBySelector", function() {
    var span = document.getElementById("span");
    var nodeList = fixture.getElementsBySelector("span");

    ok( nodeList.constructor == CompromiseNodeList, "Returns an NodeList" );
    ok( nodeList.length == 1, "Returns 1 objects" );
    ok( nodeList[0] == span, "The object is the span" );
});

test( "Element.prototype.getComputedStyle", function() {
    var span = document.getElementById("span");

    ok( span.getComputedStyle("position") == "static", "The span is static" );
    
    span.style.position = "relative";
    ok( span.getComputedStyle("position") == "relative", "The span is relative" );
    
    span.style.position = "";
    ok( span.getComputedStyle("position") == "static", "The span is static again" );
});
