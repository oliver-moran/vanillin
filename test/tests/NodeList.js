module("NodeList", {
    setup: function() {
        for (var i = 0; i < 10; i++) {
            var span = document.createElement("span");
            span.setAttribute("id", "span" + i);
            fixture.appendChild(span);
        }
    },
    teardown: function () {
        for (var i = 0; i < 10; i++) {
            var span = document.getElementById("span"+i);
            span.parentNode.removeChild(span);
        }
    }
});

test( "NodeList.prototype.forEach", function() {
    var nodeList = fixture.querySelectorAll("span");

    var c = 0;
    var elements = true;
    var indexes = true;
    var lists = true;
    
    nodeList.forEach(function(el, i, list){
        if (el != nodeList[c])
            elements = false;
        if (i != c)
            indexes = false;
        if (list != nodeList)
            lists = false;
        
        c++;
    });
    
    ok( c == 10, "Count was correct" );
    ok( elements, "Elements were correct" );
    ok( indexes, "Indexes were correct" );
    ok( lists, "NodeLists were correct" );
});