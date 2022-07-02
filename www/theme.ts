import { delay } from "./util.js";
import { AnimatedSVGElement, animate_icon, delayed_animate_callback } from "./index-animate.js";

// Add a "colors" property to the document (as a global).
declare global { interface Document {
	colors: {
		black: string;
		gray: string;
		gray_d: string;
		gray_l: string;
		white: string;

		green: string;
		green_d1: string;
		green_d2: string;
		green_l1: string;
		green_l2: string;
	};
} }
export type Theme = "sun" | "moon";

export function toggle_theme_buttons() {
	let buttons = document.querySelectorAll(".button-theme > svg");
	for (let button of buttons) {
		button.classList.toggle("hidden");
	}
}
export function populate_colors() {
	document.colors = document.colors || {};

	const style = getComputedStyle(document.documentElement);
	let c = document.colors;

	c.black  = style.getPropertyValue("--c-gray-d2");
	c.gray   = style.getPropertyValue("--c-gray-n" );
	c.gray_d = style.getPropertyValue("--c-gray-d1");
	c.gray_l = style.getPropertyValue("--c-gray-l1");
	c.white  = style.getPropertyValue("--c-gray-l2");

	c.green    = style.getPropertyValue("--c-green-n" );
	c.green_d1 = style.getPropertyValue("--c-green-d1");
	c.green_d2 = style.getPropertyValue("--c-green-d2");
	c.green_l1 = style.getPropertyValue("--c-green-l1");
	c.green_l2 = style.getPropertyValue("--c-green-l2");
}
function swap_colors() {
	function swap_css_props(element: HTMLElement, x: string, y: string) {
		let x_old = getComputedStyle(root).getPropertyValue(x);
		let y_old = getComputedStyle(root).getPropertyValue(y);
		element.style.setProperty(x, y_old);
		element.style.setProperty(y, x_old);
	}

	let root = document.documentElement;
	swap_css_props(root, "--c-gray-d2a", "--c-gray-l2a");
	swap_css_props(root, "--c-gray-d2" , "--c-gray-l2" );
	swap_css_props(root, "--c-gray-d1" , "--c-gray-l1" );
	swap_css_props(root, "--c-green-d2", "--c-green-l2");
	swap_css_props(root, "--c-green-d1", "--c-green-l1");
	swap_css_props(root, "--c-pink-d2" , "--c-pink-l2" );
	swap_css_props(root, "--c-pink-d1" , "--c-pink-l1" );

	populate_colors();
}

document.addEventListener("DOMContentLoaded", () => {
	populate_colors();

	let theme: Theme = localStorage.theme;
	// Initialize theme (no existing settings found).
	if (theme === null) {
		theme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "moon" : "sun";
		localStorage.theme = theme;
	}
	// Toggle if dark mode (default is light mode).
	if (theme == "moon") {
		toggle_theme_buttons();
		swap_colors();
	}

	// Register click event handlers for theme buttons.
	let buttons = document.querySelectorAll(".button-theme > svg");
	for (let button of buttons) {
		button.addEventListener("click", async () => {
			// Update saved theme value.
			let theme: Theme = localStorage.theme;
			theme = (theme == "moon") ? "sun" : "moon";
			localStorage.theme = theme;

			// Prepare elements to modify.
			let circles = document.querySelectorAll(".circle > svg");
			let screen_transition = document.getElementById("screen-transition");
			if (screen_transition === null) {
				throw new Error("Could not configure transition screen.");
			}

			// Fade in transition screen.
			screen_transition.style.backgroundColor = document.colors.gray_d;
			screen_transition.classList.remove("hidden");
			await delay(20);
			// Tiny delay to ensure the browser processes that a CSS
			// transition is needed here.
			screen_transition.classList.add("screen-appearing");
			await delay(580);
			screen_transition.classList.remove("screen-appearing");

			// Swap out colors + restart animations.
			swap_colors();
			for (let circle of circles) {
				let svg = circle as AnimatedSVGElement;
				clearTimeout(svg.animate_timer);
				if (svg.is_animating) {
					if (svg.animate_cleanup !== undefined) {
						svg.animate_cleanup();
					}
					animate_icon(svg);
				} else {
					svg.animate_timer = delayed_animate_callback(svg)();
				}
			}

			// Swap visibility of theme buttons.
			toggle_theme_buttons();

			// Fade out transition screen.
			screen_transition.classList.add("screen-disappearing");
			await delay(240);
			screen_transition.classList.remove("screen-disappearing");
			screen_transition.classList.add("hidden");
		});
	}
});
