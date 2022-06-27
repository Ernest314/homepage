function populate_colors() {
	document.colors = [];
	let c = document.colors;
	let style = getComputedStyle(document.documentElement);
	c.black = style.getPropertyValue("--c-gray-d2");
	c.gray = style.getPropertyValue("--c-gray-n");
	c.gray_d = style.getPropertyValue("--c-gray-d1");
	c.gray_l = style.getPropertyValue("--c-gray-l1");
	c.white = style.getPropertyValue("--c-gray-l2");
	c.green = style.getPropertyValue("--c-green-n");
	c.green_d1 = style.getPropertyValue("--c-green-d1");
	c.green_d2 = style.getPropertyValue("--c-green-d2");
	c.green_l1 = style.getPropertyValue("--c-green-l1");
	c.green_l2 = style.getPropertyValue("--c-green-l2");
}

function swap_colors() {
	function swap_css_properties(element, x, y) {
		let x_old = getComputedStyle(root).getPropertyValue(x);
		let y_old = getComputedStyle(root).getPropertyValue(y);
		element.style.setProperty(x, y_old);
		element.style.setProperty(y, x_old);
	}
	let root = document.documentElement;
	swap_css_properties(root, "--c-gray-d2a", "--c-gray-l2a");
	swap_css_properties(root, "--c-gray-d2", "--c-gray-l2");
	swap_css_properties(root, "--c-gray-d1", "--c-gray-l1");
	swap_css_properties(root, "--c-green-d2", "--c-green-l2");
	swap_css_properties(root, "--c-green-d1", "--c-green-l1");
	swap_css_properties(root, "--c-pink-d2", "--c-pink-l2");
	swap_css_properties(root, "--c-pink-d1", "--c-pink-l1");
	populate_colors();
}

function toggle_theme_buttons() {
	let theme_buttons = document.querySelectorAll(".button-theme > svg");
	theme_buttons.forEach(button => { button.classList.toggle("hidden"); });
}

document.addEventListener("DOMContentLoaded", () => {
	populate_colors();

	let theme = localStorage.theme;
	if (theme == null) {
		theme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "moon"
			: "sun";
		localStorage.theme = theme;
	}
	if (theme == "moon") {
		// Default is light mode.
		toggle_theme_buttons();
		swap_colors();
	}

	let theme_buttons = document.querySelectorAll(".button-theme > svg");
	theme_buttons.forEach(button => {
		button.addEventListener("click", () => {
			// Set saved theme value.
			let theme = localStorage.theme;
			theme = (theme == "moon") ? "sun" : "moon";
			localStorage.theme = theme;

			// Prepare list of currently-animating icons.
			let circles_animating = [];
			let circles = document.querySelectorAll(".circle > svg");
			circles.forEach(circle => {
			});

			// Fade in transition screen.
			let screen_transition = document.getElementById("screen-transition");
			screen_transition.style.backgroundColor = document.colors.gray_d;
			screen_transition.classList.remove("hidden");
			setTimeout(() => {
				// This needs a tiny delay or the browser might not realize
				// a CSS transition is needed here.
				screen_transition.classList.add("screen-appearing");
				setTimeout(() => {
					screen_transition.classList.remove("screen-appearing");

					// Swap out colors + restart animations.
					swap_colors();
					circles.forEach(circle => {
						clearTimeout(circle.animate_timer);
						if (circle.is_animating) {
							if (circle.animate_cleanup) {
								circle.animate_cleanup();
							}
							animate_icon(circle);
						} else {
							circle.animate_timer = delayed_animate_callback(circle)();
						}
					});

					// Swap visibility of theme buttons.
					toggle_theme_buttons();

					// Fade out transition screen.
					screen_transition.classList.add("screen-disappearing");
					setTimeout(() => {
						screen_transition.classList.remove("screen-disappearing");
						screen_transition.classList.add("hidden");
					}, 240);
				}, 580);
			}, 20);
		});
	});
});
