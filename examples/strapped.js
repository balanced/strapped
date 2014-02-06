$(document).ready(function() {
	$('.hex').each(function(index, div) {
		var rgb = $(div).closest('.item').css('backgroundColor');
		$(div).text(rgb2hex(rgb).toUpperCase());
	});

	$('.property > .name').each(function (index, name){
		var colorName = $(name).text();
		var colorLevel = colorName.substr(colorName.length - 2);
		if (colorLevel == '20' || colorLevel == '40') {
			$(name).parent().css('color', '#353B47');
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
