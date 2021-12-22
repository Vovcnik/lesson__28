//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}
function sliders_bild_callback(params) { }

new Swiper('.slider-introducing__body', {
	wrapperClass: "slider-introducing__wrapper",
	slideClass: "slider-introducing__item",
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 800,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	pagination: {
		el: '.slider-introducing__dotts',
		clickable: true,
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

//========================================================================================================================================================
let sliderOurSpaces;
let allSlides = document.querySelector('.our-spaces ._fraction__all');
let allCurrentSlide = document.querySelector('.our-spaces ._fraction__current');
const allSlidesCounter = document.querySelectorAll('.slider-our-spaces__slide').length;

sliderOurSpaces = new Swiper('.slider-our-spaces__body', {
	observer: true,
	observeParents: true,
	slidesPerView: 3,
	spaceBetween: 30,
	watchSlidesVisibility: true,
	speed: 800,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	navigation: {
		nextEl: '.header-our-spaces__arrow_right',
		prevEl: '.header-our-spaces__arrow_left',
	},
	pagination: {
		el: '.slider-our-spaces__progress',
		type: 'progressbar',
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1.1,
			spaceBetween: 15,
			//autoHeight: true,
		},
		// when window width is >= 480px
		550: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		// when window width is >= 640px
		992: {
			slidesPerView: 3,
			spaceBetween: 30
		}
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
		init: function (slider) {
			allSlides.innerHTML = setZeroFormat(allSlidesCounter);
		},
		slideChange: function (slider) {
			let currentSlide = ++slider.realIndex;
			allCurrentSlide.innerHTML = setZeroFormat(currentSlide);
		},
	}
});

//========================================================================================================================================================
function initOurFacilitiesSlider() {
	const sliderBlocks = document.querySelectorAll('.our-facilities__block');
	if (sliderBlocks.length > 0) {
		sliderBlocks.forEach((sliderBlock, index) => {
			sliderBlock.classList.add('_show');
			const slider = sliderBlock.querySelector('.our-facilities__slider');
			const allOurFacilitiesSliders = document.querySelectorAll('.controls-our-facilities__item')[index].querySelector('._fraction__all');
			const allCurrentOurFacilitiesSlide = document.querySelectorAll('.controls-our-facilities__item')[index].querySelector('._fraction__current');
			const allOurFacilitiesSlidersProgress = document.querySelectorAll('.controls-our-facilities__item')[index].querySelector('.controls-our-facilities__progress');
			const allOurFacilitiesSlidersCounter = slider.querySelectorAll('.our-facilities__slide').length;
			const sliderItem = new Swiper(slider, {
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 0,
				//watchSlidesVisibility: true,
				speed: 800,
				loop: true,
				pagination: {
					el: allOurFacilitiesSlidersProgress,
					type: 'progressbar',
				},
				on: {
					lazyImageReady: function () {
						ibg();
					},
					init: function () {
						allOurFacilitiesSliders.innerHTML = setZeroFormat(allOurFacilitiesSlidersCounter);
					},
					slideChange: function (sl) {
						let currentSlide = ++sl.realIndex;
						allCurrentOurFacilitiesSlide.innerHTML = setZeroFormat(currentSlide);
					},
				}
			});
			sliderBlock.classList.remove('_show');
		});
	}
}
initOurFacilitiesSlider();

const tabsOurFacilities = document.querySelector('.tabs-our-facilities');
tabsOurFacilities.addEventListener("click", function (e) {
	const targetElement = e.target;
	if (targetElement.classList.contains('tabs-our-facilities__item')) {
		const tabsElements = Array.from(document.querySelectorAll('.tabs-our-facilities__item'));
		tabsElements.forEach(item => item.classList.remove('_active'));
		targetElement.classList.add('_active');

		const index = tabsElements.findIndex(item => item.classList.contains('_active'));

		const ourFacilitiesControls = document.querySelectorAll('.controls-our-facilities__item');
		ourFacilitiesControls.forEach(item => item.classList.remove('_active'));

		const ourFacilitiesSliders = document.querySelectorAll('.our-facilities__block');
		ourFacilitiesSliders.forEach(item => item.classList.remove('_active'));

		ourFacilitiesControls[index].classList.add('_active');
		ourFacilitiesSliders[index].classList.add('_active');
	}
});
//========================================================================================================================================================
const frispesGallerySlider = document.querySelector('.frispes-gallery__slider');
if (frispesGallerySlider) {
	new Swiper(frispesGallerySlider, {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		watchSlidesVisibility: true,
		speed: 800,
		loop: true,
		loopedSlides: 20,
		loopAdditionalSlides: 20,
		preloadImages: false,
		lazy: true,
		// Dotts
		navigation: {
			nextEl: '.frispes-gallery__arrow_right',
			prevEl: '.frispes-gallery__arrow_left',
		},

		breakpoints: {
			// when window width is >= 320px
			320: {
				spaceBetween: 10,
				//autoHeight: true,
			},
			// when window width is >= 992px
			992: {
				spaceBetween: 30
			}
		},

		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}
//========================================================================================================================================================
const reviewsSlider = document.querySelector('.slider-reviews__body');
if (reviewsSlider) {
	new Swiper(reviewsSlider, {
		observer: true,
		observeParents: true,
		slidesPerView: 2.5,
		spaceBetween: 30,
		watchOverflow: true,
		watchSlidesVisibility: true,
		speed: 800,
		loop: true,
		pagination: {
			el: '.slider-reviews__progress',
			type: 'progressbar',
		},
		// Dotts
		navigation: {
			nextEl: '.header-reviews__arrow_right',
			prevEl: '.header-reviews__arrow_left',
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.1,
				spaceBetween: 10,
				//autoHeight: true,
			},
			// when window width is >= 480px
			520: {
				slidesPerView: 1.5,
				spaceBetween: 15,
				//autoHeight: true,
			},
			// when window width is >= 992px
			992: {
				slidesPerView: 2.5,
				spaceBetween: 30
			}
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}


//========================================================================================================================================================
function setZeroFormat(item) {
	let result = item >= 10 ? item : "0" + item;
	return result;
}