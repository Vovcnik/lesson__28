
if (isMobile.any()) {
	const ourSpacesSlider = document.querySelector('.slider-our-spaces__body');
	if (ourSpacesSlider) {
		ourSpacesSlider.addEventListener("click", function (e) {
			let item = e.target;
			if (item.closest('.slide-our-spaces')) {
				item.closest('.slide-our-spaces').classList.toggle('_active');
			};
		});
	}
	console.log('000');
}

//========================================================================================================================================================

const help = document.querySelector('.help');
let helpGo = true;
help.addEventListener("click", function (e) {
	const targetElem = e.target;
	if (targetElem.classList.contains('help__link')) {
		if (helpGo) {
			helpGo = false;
			_slideToggle(targetElem.previousElementSibling, 500);
			targetElem.classList.toggle('_active');
			setTimeout(() => {
				helpGo = true;
			}, 500);
		}
		e.preventDefault();

	}
	if (targetElem.classList.contains('help__more')) {
		if (!targetElem.classList.contains('_loading')) {
			targetElem.classList.add('_loading');
			getMoreQuestions(targetElem);
		}
		e.preventDefault();
	}

});

async function getMoreQuestions(targetElem) {
	const response = await fetch('data/faq.html');
	if (response.ok) {
		const text = await response.text();
		const helpItems = document.querySelector('.help__items');
		helpItems.insertAdjacentHTML('beforeend', text);
		targetElem.classList.remove('_loading');
	} else {
		alert('Что-то пошло не так...');
	}
}