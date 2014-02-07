$(document).ready(function() {

	$('.nav li a').click(function() {
		event.preventDefault();
		$($(this).attr('href'))[0].scrollIntoView();
		scrollBy(0, -54);
	});
	
	// colors
	$('.hex').each(function(index, div) {
		var rgb = $(div).closest('.item').css('backgroundColor');
		$(div).text(rgb2hex(rgb).toUpperCase());
	});

	var lightBg = ['20', '40', 'y3', 'y2', 'y1', 'te'];

	$('.property > .name').each(function (index, name){
		var colorName = $(name).text();
		var colorLevel = colorName.substr(colorName.length - 2);
		
		if (colorName == 'gray6') {
			$(name).closest('.item').css('boxShadow', 'inset 0 0 0 3px #000');
			$(name).closest('.item').append('<div class="label">body text</div>')
		} else if (colorName == 'gray1') {
			$(name).closest('.item').css('boxShadow', 'inset 0 0 0 3px #000');
			$(name).closest('.item').append('<div class="label">page background</div>')
		} else if (colorName == 'persianBlue100') {
			$(name).closest('.item').css('boxShadow', 'inset 0 0 0 3px #000');
			$(name).closest('.item').append('<div class="label">body links</div>')
		} else if (colorName == 'white') {
			$(name).closest('.item').css('boxShadow', 'inset 0 0 0 1px #D7D8D9');
		}

		if ($.inArray(colorLevel, lightBg) > -1) {
			$(name).closest('.item').css('color', '#353B47');
		}
	});

});

$(window).load(function(){
	var $container = $('#masonry');
	$container.masonry({
	  itemSelector: '.item',
	  transitionDuration: 0
	});
});

function rgb2hex(rgb) {
	 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	 return "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
					("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
					("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}
