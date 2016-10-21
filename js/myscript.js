"use strict";

var formValidate = function(){
	$('#form').on('submit', function (event) {
        event.preventDefault();

        var name = $('#form #name').val();
        var phone = $('#form #phone').val();
        var email = $('#form #email').val();
        var address = $('#form #address').val();

        function isValidEmailAddress(email) {
		    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		    return pattern.test(email);
		};
		function isValidPhone(phone) {
		    var pattern = /[0-9\-\(\)\s]/;
		    return pattern.test(phone);
		};

		if (name.length < 1) {
			$('#form #name').addClass('error');
		} else {
			$('#form #name').removeClass('error');
			var validName = $('#form #name').val();
		}

		if (phone.length < 1 || !isValidPhone( phone )) {
			$('#form #phone').addClass('error');
		} else {
			$('#form #phone').removeClass('error');
			var validPhone = $('#form #phone').val();
		}

		if (email.length < 1 || !isValidEmailAddress( email )) {
			$('#form #email').addClass('error');
		} else {
			$('#form #email').removeClass('error');
			var validEmail = $('#form #email').val();
		}

		if (address.length < 1 ) {
			$('#form #address').addClass('error');
		} else {
			$('#form #address').removeClass('error');
			var validAddress = $('#form #address').val();
		}


        if (!validName || !validPhone || !validEmail || !validAddress ) {
        	return false;
        }


        $.ajax({  
		    type: 'POST',  
		    url: 'sendmail.php', 
		    data: { 
		    	name : name,
		    	email : email,
		    	phone : phone,
		    	address : address
		    },
		    success: function(data) {
		        $('#form').trigger("reset");
		        $('.responce_ok').show();
		        setTimeout(function(){
		        	$('.responce_ok').fadeOut();
		        }, 2000);
		    },
		    error: function (data) {
                $('#form').trigger("reset");
		        $('.responce_error').show();
		        setTimeout(function(){
		        	$('.responce_error').fadeOut();
		        }, 2000);
            }
		});
    });
}

var smoothScroll = function(){
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
}

$(window).load(function(){
	formValidate();
	smoothScroll();
});