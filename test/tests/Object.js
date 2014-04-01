module("Object", {
    setup: function() {
    },
    teardown: function () {
    }
});

test( "Object.prototype.clone", function() {
    var obj = {
        alpha: "alpha",
        child: {
            beta: "beta"
        }
    }
    
    var clone = obj.clone();
    
    ok(clone != obj, "Original and clone are not the same object");
    ok(obj.alpha == clone.alpha, "Properties are the same");
    ok(obj.child != clone.child, "Child objects are not the same");
    ok(obj.child.beta == clone.child.beta, "Properties of children are the same");
});

test( "Object.prototype.isIdenticalTo", function() {
    var obj1 = {
        alpha: "alpha",
        child: {
            beta: "beta"
        }
    }
    
    var obj2 = {
        alpha: "alpha",
        child: {
            beta: "beta"
        }
    }
    
    var obj3 = {
        alpha: "alpha",
        child: {
            beta: "gama"
        }
    }

    ok(obj1.isIdenticalTo(obj2) === true, "Objects 1 and 2 are identical" );
    ok(obj1.isIdenticalTo(obj3) === false, "Objects 1 and 3 are different" );
});