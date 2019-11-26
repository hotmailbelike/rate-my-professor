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

$('form a').click(function() {
	$('.search-prof').hide();
	$('.search-school').hide();
	$('.rate-prof').hide();
	$('.option-block').show();
});

// $('.col-3').click(function() {
// 	// $('#options').hide();
// 	// $('.text-yellow').hide();
// 	$('.option-block').hide();
// });
