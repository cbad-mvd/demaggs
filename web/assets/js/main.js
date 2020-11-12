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

	var sInitialClick = true;
	$('.jsShowUserMenu').click(function() {
		var showIt = ($('#userMenu').css('display') == "none");

		if ( showIt ) {
			event.preventDefault();
			$('#userMenu').css('display', "block");
			sInitialClick = true;

			$(document).on("click", function(e) {
				var target = $( e.target );

				if ( 	target.is( "div#userMenu" ) ||
						target.is( "div#userMenu ul li" ) || 
						target.is( "div#userMenu ul li a" ) || 
						target.is( "div#userMenu ul" ) ) {
					// e.type is the type of event
					// e.target is the element the event originally occured in
					// do nothing alert(e.target);
				}
				else {
					if ( !sInitialClick ){
						event.preventDefault();
						$('#userMenu').css('display', "none");
						$(document).off("click");						
					}
					sInitialClick = false;
				}
			});
		}
		else {
			event.preventDefault();
			$(document).off("click");
			$('#userMenu').css('display', "none");
		}
	});

	$('.jsRemoveLineItem').click(function() {
		var $this = $(this);
		var id = $(this).data('line-item-id');
		var data = {
			action: 'commerce/cart/update-cart',
			lineItems: {[id]: {'remove': true}}
		};
		$.ajax({
			type: "POST",
			dataType: 'json',
			headers: {
				"X-CSRF-Token" : window.csrfTokenValue,
			},
			url: '/',
			data: data,
			success: function(response){
				location.reload();
				console.log("successfully updated cart", response, data);
			},
			fail :function(response) {
				console.log("error updating cart", response, data);
			}
		});

	});
	
});
