// console.log('heloooo')

// ------ without button click---------
// $('.inactive').click(function(e){
//     var text = $(this).text()
//     var tag = $('.tag-box')
//     var span = $('<span>').attr("class","tag").append(text)
//     tag.append(span)
//     console.log(text)
// })
// -----------------------------------

var tags = [];
$('.inactive').click(function(e) {
	var text = $(this).text();
	tags.push(text);

	console.log(tags);
});
$('#id-tags').click(function(e) {
	var t;
	var span;
	var tag = $('.tag-box');
	for (var i = 0; i < tags.length; i++) {
		t = tags[i];
		span = $('<span>')
			.attr('class', 'tag')
			.append(t);
		tag.append(span);
	}
});
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

$('button.rate').click(function() {
	var id = $(this).attr('id');
	// console.log(id);
	let href = '/review/' + id;
	window.location.href = href;
});
