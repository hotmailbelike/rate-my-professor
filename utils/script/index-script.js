$('.search-prof').hide();
$('.search-school').hide();
$('.rate-prof').hide();

$('.col-3').mouseenter(function() {
	var temp = $(this)
		.children('h2')
		.text();

	if (temp === 'Rate') {
		temp = 'the Outlet';
	} else {
		temp = 'the ' + temp;
	}

	$('#change-color').text(temp);

	// console.log(temp);
});

$('.col-3').mouseleave(function() {
	$('#change-color').text('What');
});

$('#professor').click(function() {
	$('.option-block').hide();
	$('.search-prof').show();
});

$('#school').click(function() {
	$('.option-block').hide();
	$('.search-school').show();
});

$('#rate').click(function() {
	$('.option-block').hide();
	$('.rate-prof').show();
});

// $('form a').click(function() {
// 	$('.search-prof').hide();
// 	$('.search-school').hide();
// 	$('.rate-prof').hide();
// 	$('.option-block').show();
// });

// $('.col-3').click(function() {
// 	// $('#options').hide();
// 	// $('.text-yellow').hide();
// 	$('.option-block').hide();
// });

$('a').click(function() {
	// $('#search-prof')[0].reset();
	// $('#search-school')[0].reset();
	// $('#rate-prof')[0].reset();
	$('.search-prof').hide();
	$('.search-school').hide();
	$('.rate-prof').hide();
	$('.option-block').show();
});

$('#search1').click(function() {
	var name = $('#search-prof .name').val();
	var school = $('#search-prof .school').val();
	var searchTerm = { name, school };

	// $.ajax({
	// 	method: 'GET',
	// 	url: '/home/search_prof',
	// 	data: searchTerm
	// })
	// 	.done((res) => {})
	// 	.fail((res) => {});
	let href = '/home/search_prof?name=' + name + '&school=' + school;
	window.location.href = href;

	$('input').val('');

	// console.log(name, school);
});

$('#search2').click(function() {
	var school = $('#search-school .school').val();
	var searchTerm = { school };

	let href = '/home/search_school?school=' + school;

	window.location.href = href;

	// $.ajax({
	// 	method: 'GET',
	// 	url: '/home/search_school',
	// 	data: searchTerm
	// })
	// 	.done((res) => {})
	// 	.fail((res) => {});
	// console.log(school);
});

$('#search3').click(function() {
	var name = $('#rate-prof .name').val();
	var searchTerm = { name };

	let href = '/home/rate_prof?name=' + name;

	window.location.href = href;

	// $.ajax({
	// 	method: 'GET',
	// 	url: '/home/rate_prof',
	// 	data: searchTerm
	// })
	// 	.done((res) => {})
	// 	.fail((res) => {});
	// // console.log(name);
});
