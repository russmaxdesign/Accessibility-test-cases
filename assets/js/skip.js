$(document).ready(function(){

	// If there is a '#' in the URL (someone linking directly to a page with an anchor), highlight that section and set focus to it.
	// The tabindex attribute is removed AFTER the user navigates away from the element to help address a nasty VoiceOver bug.
	
	if (document.location.hash) {
		var myAnchor = document.location.hash;
		$(myAnchor).attr('tabindex', -1).on('blur focusout', function () {
			$(this).removeAttr('tabindex');
		}).focus().yellowFade();
	}
	
	/* This function looks for a change in the hash (activation of an in-page link) and sets focus to and 
	highlights the target element. This is necessary because webkit does not set focus as it should. If 
	the hash is empty (the user hit the back button after activating an in-page link) focus is set to body.
	*/
	$(window).bind('hashchange', function() {
		var hash = "#"+window.location.hash.replace(/^#/,'');
		if (hash!="#") {
			$(hash).attr('tabindex', -1).on('blur focusout', function () {
				$(this).removeAttr('tabindex');
			}).focus().yellowFade();
		}
		else {
			$("#headcontainer").attr('tabindex', -1).on('blur focusout', function () {
				$(this).removeAttr('tabindex');
			}).focus();
		}
	});
	
	// If there's a 'fade' id (used for error identification), highlight it and set focus to it.
	if ($('#fade').length ) {
		$('#fade').attr('tabindex', -1).on('blur focusout', function () {
			$(this).removeAttr('tabindex');
		}).focus().yellowFade();
	}
	
	// Display an anchor link after hovering headings
	var timeout;
	$("#maincontent h2, #maincontent h3, #maincontent h4, #maincontent h5").hover(
		function () {
			if($(this).closest('div.section').attr('id')&&!$(this).has('span').length) {
				sectionid=$(this).closest('div').attr('id')
				var $this = jQuery(this);
				timeout = setTimeout(function() {
					$this.prepend("<span class='anchorlink'><a href='"+$(location).attr('pathname')+"#"+sectionid+"'><img src='/media/template/anchorlink.png' alt='Link to this section' title='Link to this section'></a></span>");
				}, 1500);
			}
		}, function () {
			clearTimeout(timeout);
			$('.anchorlink').remove();
		}
	);

	// Removes the x & y coordinates from the GET parameters of the search image input button
	$("#sitesearch").submit(function( event ) {
		window.location.href = "/search/?q=" + $("#q").val();
		event.preventDefault();
	});


// Flying Focus - http://n12v.com/focus-transition/
(function() {

if (document.getElementById('flying-focus')) return;

var flyingFocus = document.createElement('flying-focus'); // use uniq element name to decrease the chances of a conflict with website styles
flyingFocus.id = 'flying-focus';
document.body.appendChild(flyingFocus);

var DURATION = 100;
flyingFocus.style.transitionDuration = flyingFocus.style.WebkitTransitionDuration = DURATION / 1000 + 's';

function offsetOf(elem) {
	var rect = elem.getBoundingClientRect();
	var docElem = document.documentElement;
	var win = document.defaultView;
	var body = document.body;

	var clientTop  = docElem.clientTop  || body.clientTop  || 0,
		clientLeft = docElem.clientLeft || body.clientLeft || 0,
		scrollTop  = win.pageYOffset || docElem.scrollTop  || body.scrollTop,
		scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
		top  = rect.top  + scrollTop  - clientTop,
		left = rect.left + scrollLeft - clientLeft;

	return {top: top, left: left};
}

var movingId = 0;
var prevFocused = null;
var isFirstFocus = true;
var keyDownTime = 0;

document.documentElement.addEventListener('keydown', function(event) {
	var code = event.which;
	// Show animation only upon Tab or Arrow keys press.
	if (code === 9 || (code > 36 && code < 41)) {
		keyDownTime = now();
	}
}, false);

document.documentElement.addEventListener('focus', function(event) {
	var target = event.target;
	if (target.id === 'flying-focus') {
		return;
	}
	var offset = offsetOf(target);
	flyingFocus.style.left = offset.left + 'px';
	flyingFocus.style.top = offset.top + 'px';
	flyingFocus.style.width = target.offsetWidth + 'px';
	flyingFocus.style.height = target.offsetHeight + 'px';

	// Would be nice to use:
	//
	//   flyingFocus.style['outline-offset'] = getComputedStyle(target, null)['outline-offset']
	//
	// but it always '0px' in WebKit and Blink for some reason :(

	if (isFirstFocus) {
		isFirstFocus = false;
		return;
	}

	if (now() - keyDownTime > 42) {
		return;
	}

	onEnd();
	target.classList.add('flying-focus_target');
	flyingFocus.classList.add('flying-focus_visible');
	prevFocused = target;
	movingId = setTimeout(onEnd, DURATION);
}, true);

document.documentElement.addEventListener('blur', function() {
	onEnd();
}, true);


function onEnd() {
	if (!movingId) {
		return;
	}
	clearTimeout(movingId);
	movingId = 0;
	flyingFocus.classList.remove('flying-focus_visible');
	prevFocused.classList.remove('flying-focus_target');
	prevFocused = null;
}

function now() {
	return new Date().valueOf();
}

})();


});

(function($) {
	$.fn.yellowFade = function() {
		return (this.css({backgroundColor: "#ffff66"}).animate(
		{backgroundColor: "#ffffff"}, 1000));
	}
})(jQuery);
