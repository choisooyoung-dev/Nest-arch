var User = (function($){
    let add_user = function(e) {
        let name = $('.nameInput').val();
        let email = $('.emailInput').val();

        axios.post('/user', { name: name, email: email })
        .then(function (response) {
            console.log('response', response)
            if (response.data.status == "success") {
                window.location.href = '/user';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return {
        init: function(){

            $('#add_btn').on('click', add_user);
        }
    };
}(jQuery));

$(document).ready(function(){
    User.init();
});