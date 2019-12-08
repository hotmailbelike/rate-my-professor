$('.nav-form').submit(function(e) {
	e.preventDefault();
	var name = $('#search').val();
	// console.log(name);
	if (!name) {
		return;
	}
	let href = '/home/rate_prof?name=' + name;
	window.location.href = href;
});

$('#border-top-bottom').off('click');

$('tr.clickable').click(function() {
	console.log('object');
	var id = $(this).attr('id');
	var url = window.location.href;

	let href = '/prof_info?id=' + id + '&url=' + url;
	window.location.href = href;
});
