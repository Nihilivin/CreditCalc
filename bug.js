
function attach(a, b, c) {
    (a.addEventListener || a.attachEvent).call(a, b, c);
}
(function(){
    var foo = false,
        bar = {};
    window.hello = function(){
        if(!foo){
            foo = true;
            bar = {a:1};
            attach(window, "resize", function(e){
                console.log(foo, bar)
            });
        }
    }
    window.hello();
})();