$('form').submit(function(e) {
	var id = $('#user-id').val();
	var pass = $('#password').val();
	if (id === 'admin@admin.com' && pass === 'admin1234') {
		$('form').attr('action', '/input_prof_info');
	} else {
		e.preventDefault();
		alert('Wrong ID and Password');
		$(this)[0].reset();
	}
});
