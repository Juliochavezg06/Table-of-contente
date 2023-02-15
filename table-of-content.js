document.addEventListener('DOMContentLoaded', () => {
	const headings = document.querySelectorAll('#content h3, #content h3')
	if (headings && headings.length) {
		let tableOfContentInner = ''
		headings.forEach((heading, i) => {
			// generate an 'li' element that includes a link to the appropriate section
			tableOfContentInner += `<li><a href="#section_${i}">${heading.textContent}</a></li>`
			const originalHeadingContent = heading.innerHTML
			const anchor = `<a class="offset-anchor" id="section_${i}"></a>`
			// add the anchor to the <h3> tag
			heading.innerHTML = anchor + originalHeadingContent

		})
		const tableOfContent = `<ol>${tableOfContentInner}</ol>`
		// add the generated table of contents to the dive
		document.querySelector('#table-of-content').innerHTML += tableOfContent
        
		link_scrolldown()
	}
})

function link_scrolldown() {
	jQuery('a[href*="#"]')
	// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				jQuery('html, body').animate({
					scrollTop: target.offset().top - 100
				}, 1000, function() {
					// Callback after animation
					// Must change focus!
					var jQuerytarget = jQuery(target);
					jQuerytarget.focus();
					if (jQuerytarget.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						//$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						jQuerytarget.focus(); // Set focus again
					};
				});
			}
		}
	});
}
