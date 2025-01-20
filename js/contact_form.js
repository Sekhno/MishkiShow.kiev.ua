const jQuery = $;
jQuery(document).ready(function(){
	// Contact Form Submition
	function checkRequire(formId , targetResp){
		targetResp.html('');
		const email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		const url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		const image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		const mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		const facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		const twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		const google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		let check = 0;
		$('#er_msg').remove();
		let target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}


	jQuery(".submitForm").on("click", function() {
		const _this = $(this);
		const targetForm = _this.closest('form');
		const errroTarget = targetForm.find('.response');
		const check = checkRequire(targetForm , errroTarget);

		const afterSuccessSubmit = () => {
			targetForm.find('input').val('');
			targetForm.find('textarea').val('');
			errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
		}
		if(check == 0){
			const formDetail = new FormData(targetForm[0]);
			const formObject = Object.fromEntries(formDetail.entries());

			jQuery.ajax({
				method : 'post',
				url : 'https://docs.google.com/forms/d/e/1FAIpQLSfcBzwdsgSe4R54kJeBX7cbeuKUusL3pzjlvJaBThy3mMWwlA/formResponse',
				data:formObject,
				contentType: 'application/x-www-form-urlencoded',
				processData: true,  // Дозволяє jQuery обробити дані
				error: afterSuccessSubmit
			}).done(function(resp){
				console.log(errroTarget);
				afterSuccessSubmit()
			})
		}
	});
});
