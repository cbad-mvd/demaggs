function test() {
	return;
}


// @ts-ignore
$(document).ready(function () {

	/*
	 * detect hover enabled devices
	 */
	var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
	if (touchsupport){ // browser doesn't support touch
		$("body").addClass("has-touch");
		$(".MenuChoices .MenuChoices-overlay").css("display","block");
	}	
	else {
	}

	/*
	 * initialize lazyloading
	 */
	var lazyLoad = new LazyLoad({
		elements_selector: ".lazy",
		cancel_on_exit: true
	});

	/*
	 * add mobile menu management
	 */
	var gNavMenu = '#global-nav-menu';
	$('#global-nav-slick').slicknav({
		label: '',
		prependTo: gNavMenu,
		closeOnClick: true,
		showChildren: true
	});

	/*
	 * toggle availability off drop-down when in mobile menu mode
	 */
	var appMenuMode = "desktop";
	$(window).resize(function () {
		var width = $(window).width();
		if ((width <= 750) && (appMenuMode === 'desktop')) {
			appMenuMode = "mobile";
			$('.nav__parent').removeClass('sub-menu-parent');
			$('.nav__childmenu').removeClass('sub-menu');
			$('.slicknav_nav .nav__link').removeClass('btn btn--buy btn--small');
		}
		else if ((width > 750) && (appMenuMode === 'mobile')) {
			appMenuMode = "desktop";
			$('.nav__parent').addClass('sub-menu-parent');
			$('.nav__childmenu').addClass('sub-menu');
		}
	});
	$(window).trigger("resize");

	/*
	 * add/remove local nav on scroll
	 */
	var win = $(window);

	/* before changes 
	win.scroll(function (event) {
		if (win.scrollTop() > 130) {
			$(".MainHdr").removeClass("nav--goin-out");
			$(".MainHdr").addClass("MainHdr--down");
			$(".HdrNavRow-Container").addClass("HdrNavRow-Container--down");
			$(".MainHdr").addClass("nav--comin-in");
		}
		else {
			$(".MainHdr").removeClass("nav--comin-in");
			$(".MainHdr").removeClass("MainHdr--down");
			$(".HdrNavRow-Container").removeClass("HdrNavRow-Container--down");
			$(".MainHdr").addClass("nav--goin-out");
		}
	});
	*/

	win.scroll(function (event) {
		if (win.scrollTop() < 100) {
			$(".MainHdr").removeClass("nav--goin-out");
			$(".MainHdr").removeClass("MainHdr--down");
			$(".HdrNavRow").removeClass("HdrNavRow--down");
			$(".MainHdr").addClass("nav--comin-in");
		}
		else {
			$(".MainHdr").removeClass("nav--comin-in");
			$(".MainHdr").addClass("MainHdr--down");
			$(".HdrNavRow").addClass("HdrNavRow--down");
			$(".MainHdr").addClass("nav--goin-out");
		}
	});


	$(".MenuChoices-item").hover(
		function () {
			$(this).children(":first").fadeIn(500);
		}, function () {
			$(this).children(":first").fadeOut(100);
		}
		/***
		***/
	);

	$("#jsMobileClose").click(function() {
		$(".MobileMenu").css("display","none");
	});

	$("#jsMobileShow").click(function() {
		$(".MobileMenu").css("display","block");
	});

	$(".HdrNavRow .nav-menu li a").click(function() {
		//$(".HdrNavRow .nav-menu li a").removeClass("active");
		//$(this).addClass("active");
		//alert($(this).text());
	});
});
