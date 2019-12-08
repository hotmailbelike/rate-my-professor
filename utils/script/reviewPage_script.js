var $star_rating = $('.star-rating .fa');

var SetRatingStar1 = function() {
	return $star_rating.each(function() {
		if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
			return $(this)
				.removeClass('fa-star-o')
				.addClass('fa-star');
		} else {
			return $(this)
				.removeClass('fa-star')
				.addClass('fa-star-o');
		}
	});
};

$star_rating.on('click', function() {
	$star_rating.siblings('input.rating-value').val($(this).data('rating'));
	return SetRatingStar1();
});

SetRatingStar1();
$(document).ready(function() {});

var $star = $('.star .fa');

var SetRatingStar = function() {
	return $star.each(function() {
		if (parseInt($star.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
			return $(this)
				.removeClass('fa-star-o')
				.addClass('fa-star');
		} else {
			return $(this)
				.removeClass('fa-star')
				.addClass('fa-star-o');
		}
	});
};

$star.on('click', function() {
	$star.siblings('input.rating-value').val($(this).data('rating'));
	return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {});
// --------------------------------------------------
var rate = 2;
var level = 2;
var like_to_take_prof = 'No';
var class_taken = 'No';
var textbook = 'No';
var attendance = 'No';
var ans = undefined;
var courseCode = 'N/A';
var val = undefined;
var grade = 'N/A';
var text = undefined;
var tags = [];
$('.ryp').click(function(e) {
	rate = $(this).attr('data-rating');
});
$('.lod').click(function(e) {
	level = $(this).attr('data-rating');
});

$('.radio').click(function(e) {
	ans = $(this).attr('name');

	if (ans == 'ques') {
		like_to_take_prof = $(this).val();
	} else if (ans == 'qu') {
		class_taken = $(this).val();
	} else if (ans == 'question') {
		textbook = $(this).val();
	} else if (ans == 'q') {
		attendance = $(this).val();
	}
});
// $(".inCode").click(function(e){
//    val = $(this).val()
//     $('.getCode').append($('<a>').attr("class","dropdown-item").text(val))
// })
$('.dropdown-item').click(function(e) {
	courseCode = $(this).text();
});
$('.tag').click(function(e) {
	// $(this).css('background', ' #ccff33');
	$(this).toggleClass('tag-toggle');

	text = $(this).text();

	if (!tags.includes(text)) {
		tags.push(text);
	} else {
		var index = jQuery.inArray(text, tags);
		tags.splice(index, 1);
	}

	console.log(tags);
});

$('#form').submit(function(e) {
	var textarea = 'No Comments';
	e.preventDefault();
	// sel = $(".getCode option:selected").val();
	grade = $('.grade option:selected').val();

	val = $('.inCode').val();
	if (courseCode == null) {
		courseCode = val;
		$('.dropdown-menu').append(
			$('<a>')
				.attr('class', 'dropdown-item')
				.text(courseCode)
		);
	}

	textarea = $('.textarea').val();
	console.log('like to take prof -- ', like_to_take_prof);
	console.log('class taken -- ', class_taken);
	console.log('textbook use -- ', textbook);
	console.log('attendance -- ', attendance);
	console.log('grade -- ', grade);
	console.log('courseCode -- ', courseCode);
	console.log('textarea -- ', textarea);
	console.log('rate -- ', rate);
	console.log('level -- ', level);
	console.log('tags -- ', tags);

	var d = new Date();
	var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
	var id = $(this).attr('class');
	var url = window.location.href;

	if (!grade) {
		grade = 'N/A';
	}
	if (!textarea) {
		textarea = 'No Comments';
	}

	var emote, rating_in_words, course;

	if (!rate) {
		rate = 2;
	}

	switch (rate) {
		case '1':
			emote = '128557';
			rating_in_words = 'Awful';
			break;
		case '2':
			emote = '128542';
			rating_in_words = 'Poor';
			break;
		case '3':
			emote = '128528';
			rating_in_words = 'Average';
			break;
		case '4':
			emote = '128522';
			rating_in_words = 'Good!';
			break;
		case '5':
			emote = '128513';
			rating_in_words = 'Awesome!';
			break;
		default:
			emote = '128542';
			rating_in_words = 'Poor';
	}

	course = $('#course').val();
	if (!course) {
		course = 'N/A';
	}

	var commentObj = { date: date, course: course, prof_id: id, rating: rate, level_of_difficulty: level, take_again: like_to_take_prof, forCredit: class_taken, textbook_used: textbook, attendance: attendance, grade: grade, tags: tags, comments: textarea, emote: emote, rating_in_words: rating_in_words };
	console.log(commentObj);
	$.ajax({
		method: 'POST',
		url: '/insert_comment',
		data: commentObj
	})
		.done((res) => {
			$('form')[0].reset();
			let href = '/prof_info?id=' + id + '&url=' + url;
			window.location.href = href;
		})
		.fail((res) => {});
});

// ,r2,r3,r4,rate,grade,text,textarea,level,tags,selectedVal

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
