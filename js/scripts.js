/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

// Slides 
// Initialize variables
let currentIndex = {};
const images = {};

// Function to load images into the slideshow container
function loadImages(p, id, path, totalImages) {
    images[`images${p}`] = [];
    currentIndex[`index${p}`] = 0;

    for (let i = 1; i <= totalImages; i++) {
        images[`images${p}`].push(path +`/M${p}-${i}.png`);
    }

    const slideshow = document.getElementById(id);
    images[`images${p}`].forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add(id + "-image");
        if (index === currentIndex[`index${p}`]) img.classList.add("active"); // Show the first image initially
        slideshow.appendChild(img);
    });
}

// Function to show the current image based on the index
function showImage(p,index, id) {
    const imgElement = document.getElementById(id);

    imgElement.src = images[`images${p}`][index];
    
}

// Show the next image
function nextImage(p,id) {
    if (currentIndex[`index${p}`] == images[`images${p}`].length - 1) return;

    currentIndex[`index${p}`] = (currentIndex[`index${p}`] + 1) % images[`images${p}`].length; // Wrap around if at the end
    showImage(p,currentIndex[`index${p}`], id);

}

// Show the previous image
function prevImage(p,id) {
    if (currentIndex[`index${p}`] == 0) return;
    currentIndex[`index${p}`] = (currentIndex[`index${p}`] - 1 + images[`images${p}`].length) % images[`images${p}`].length; // Wrap around if at the beginning
    
    showImage(p,currentIndex[`index${p}`], id);
}