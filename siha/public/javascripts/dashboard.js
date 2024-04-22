var List = (function($){
    let click_btn = function(e) {
        console.log('click_btn');
    }

    return {
        init: function(){
            console.log('메롱');
            $('#btn').on('click', click_btn);
        }
    };
}(jQuery));

$(document).ready(function(){
    List.init();
});