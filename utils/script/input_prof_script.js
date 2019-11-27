$('form').submit(function(e) {
	e.preventDefault();
	var name, photo, uni, school, dept;
	name = $('input[name=name]').val();
	photo = $('input[name=photo]').val();
	uni = $('#university option:selected').val();
	school = $('#school option:selected').val();
	dept = $('#dept option:selected').val();

	var profInfo = { name, photo, uni, school, dept };

	// console.log(name, photo, uni, school, dept);
	// console.log(profInfo);

	$.ajax({
		method: 'POST',
		url: '/input_prof_info',
		data: profInfo
	})
		.done((res) => {
			$('form')[0].reset();
		})
		.fail((res) => {});

	// console.log(uni);
});
