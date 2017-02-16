
$(document).ready(function(){
	var btn = $('#burguer');
	var nav = $('.nav-no-mobile');
	btn.on('click',function(e) {
		nav.css('display','block');
		nav.css('left','0');
		nav.css('z-index','1');
	});

	$(document).mouseup(function (e){
		var nav = $(".nav-no-mobile");

		if (!nav.is(e.target) && nav.has(e.target).length === 0 && $(document).width() < 900){
    		nav.css('display','none');
			nav.css('left','-30%');
		}
	});
	$( window ).resize(function() {
		if($(window).width() > 900){
			var nav = $('.nav-no-mobile');
			nav.css('display','block');
			nav.css('left','0');
			nav.css('z-index','1');
		}
		else{
			var nav = $('.nav-no-mobile');
			nav.css('display','none');
			nav.css('left','-30%');
			nav.css('z-index','1');
		}
	});
});