module("Array", {
    setup: function() {
    },
    teardown: function () {
    }
});

test( "Array.prototype.shuffle", function() {
    // FIXME: how can we unit test an fuction with an unpredictable results?
    ok(typeof Array.prototype.shuffle == "function", "Array.prototype.shuffle is a function");
});

test( "Array.prototype.removeDuplicates", function() {
    var arr1 = [0, 1, 1, 2, 3, 3, 4, 5, 5, 5];
    var arr2 = arr1.removeDuplicates();
    var c1 = 0;
    var dups1 = false;
    arr1.forEach(function(el, i, arr){
        if (c1 != el) dups1 = true;
        c1++;
    });

    var c2 = 0;
    var dups2 = false;
    arr2.forEach(function(el, i, arr){
        if (c2 != el) dups2 = true;
        c2++;
    });

    ok(dups1 == true, "The original array has duplicates" );
    ok(dups2 == false, "The new array has no duplicates" );
});