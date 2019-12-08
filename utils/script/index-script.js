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

$('a').click(function() {
	$('.search-prof').hide();
	$('.search-school').hide();
	$('.rate-prof').hide();
	$('.option-block').show();
	$('.missing').attr('hidden', 'true');
});

//Searches

$('#search1').click(function() {
	var name = $('#search-prof .name').val();
	var school = $('#search-prof .school').val();
	var searchTerm = { name, school };

	if (!name && !school) {
		$('#search-prof .missing').removeAttr('hidden');
		return;
	}
	if (!school) {
		$('#search-prof .missingSchool').removeAttr('hidden');
		return;
	}
	if (!name) {
		$('#search-prof .missingName').removeAttr('hidden');
		return;
	}

	let href = '/home/search_prof?name=' + name + '&school=' + school;
	window.location.href = href;

	$('input').val('');

	// console.log(name, school);
});

$('#search2').click(function() {
	var school = $('#search-school .school').val();
	var searchTerm = { school };
	if (!school) {
		$('#search-school .missing').removeAttr('hidden');
		return;
	}

	let href = '/home/search_school?school=' + school;

	window.location.href = href;
});

$('#search3').click(function() {
	var name = $('#rate-prof .name').val();
	var searchTerm = { name };

	let href = '/home/rate_prof?name=' + name;

	if (!name) {
		$('#rate-prof .missing').removeAttr('hidden');
		return;
	}

	window.location.href = href;
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

//Autocomplete

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

$('#search-school .school').keyup(function() {
	var data = [];
	var school = $(this).val();

	if (school === '') {
		return;
	}

	$.ajax({
		method: 'POST',
		url: '/home/search_school/' + school
		// data: searchTerm
	})
		.done((res) => {
			res.forEach((i) => {
				data.push(i.uni);
			});

			data = data.filter(onlyUnique);

			// console.log(data);
			$(this).autocomplete({
				source: data
			});
		})
		.fail((res) => {});
});

$('#rate-prof .name').keyup(function() {
	var data = [];
	var name = $(this).val();
	// console.log(name);

	if (name === '') {
		return;
	}

	$.ajax({
		method: 'POST',
		url: '/home/search_prof/' + name
		// data: searchTerm
	})
		.done((res) => {
			res.forEach((i) => {
				data.push(i.name);
			});

			// data = data.filter(onlyUnique);

			// console.log(data);
			$(this).autocomplete({
				source: data
			});
		})
		.fail((res) => {});
});

var globalSchool;

$('#search-prof .school').keyup(function() {
	var data = [];
	var school = $(this).val();

	if (school === '') {
		return;
	}
	if (school === '') {
		return;
	}
	if (school === undefined) {
		return;
	}
	if (!school) {
		return;
	}

	globalSchool = school;

	$.ajax({
		method: 'POST',
		url: '/home/search_school/' + school
		// data: searchTerm
	})
		.done((res) => {
			res.forEach((i) => {
				data.push(i.uni);
			});

			data = data.filter(onlyUnique);

			// console.log(data);
			$(this).autocomplete({
				source: data
			});
		})
		.fail((res) => {});
});

$('#search-prof .name').keyup(function() {
	var data = [];
	var name = $(this).val();
	var school = globalSchool;
	var searchTerm = JSON.stringify({ name, school });

	// console.log(globalSchool);

	if (name === '' || school === '') {
		return;
	}
	if (name === '') {
		return;
	}
	if (school === '') {
		return;
	}
	if (school === undefined) {
		return;
	}
	if (!school) {
		return;
	}

	$.ajax({
		method: 'POST',
		url: '/home/search_prof_with_school/' + searchTerm
		// data: searchTerm
	})
		.done((res) => {
			res.forEach((i) => {
				data.push(i.name);
			});
			// data = data.filter(onlyUnique);
			// console.log(data);
			$(this).autocomplete({
				source: data
			});
		})
		.fail((res) => {});
});
