// Bounds: [min, max)
function random_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	let range = max - min;
	return Math.floor(Math.random() * range + min);
}
function SVGLength_to_percent(svglength) {
	svglength.convertToSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE);
	return svglength.valueAsString;
}

function animate_icon(svg) {
	let id = svg.id;
	switch (id) {
		case "icon-journal"  : animate_icon_journal(svg)  ; break;
		case "icon-music"    : animate_icon_music(svg)    ; break;
		case "icon-resume"   : animate_icon_resume(svg)   ; break;
		case "icon-software" : animate_icon_software(svg) ; break;
		case "icon-projects" : animate_icon_projects(svg) ; break;
		case "icon-downloads": animate_icon_downloads(svg); break;
		case "icon-sandbox"  : animate_icon_sandbox(svg)  ; break;
		case "icon-admin"    : animate_icon_admin(svg)    ; break;
		case "icon-erythro"  : animate_icon_erythro(svg)  ; break;
		case "icon-unknown"  : animate_icon_unknown(svg)  ; break;
	}
}
function as_animate_params(duration, iterations) {
	return {
		duration: duration,
		iterations: iterations,
	};
}
function delayed_animate_callback(svg) {
	let delay_unit = document.duration_unit;
	let delay = random_int(2, 9) * delay_unit;
	return () => {
		return setTimeout(animate_icon, delay, svg);
	};
}
function repeat_animation(cleanup_elements, svg, animation) {
	animation.addEventListener("finish", () => {
		cleanup_elements.forEach(element => { svg.removeChild(element); });
		svg.animate_timer = delayed_animate_callback(svg)();
	});
}

function animate_icon_journal(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_nib = document.getElementById("icon-journal-nib");
	let path_stroke = document.getElementById("icon-journal-stroke");

	let iterations = random_int(2, 5);
	// If the lower bound is 1, the offsets for the stroke draw
	// animation will overlap in the middle.

	// Rotate pen.
	svg.style.overflow = "visible";
	path_nib.style.transformOrigin = "88% 96%";
	const rotate_m = "rotate(0deg)";
	const rotate_a = "rotate(5deg)";
	const rotate_b = "rotate(-5deg)";
	path_nib.animate({
		// rotate: [ "0deg", "5deg", "0deg", "-5deg", "0deg" ],
		transform: [ rotate_m, rotate_a, rotate_m, rotate_b, rotate_m ],
	}, as_animate_params(duration_unit, iterations));

	// Wiggle stroke.
	const path_a = "path(\"M 5.4357436,23.781416 C 12.559248,20.47079 14.379922,27.133922 20.648645,24.602236\")";
	const path_b = "path(\"M 5.4357436,23.781416 C 10.267767,27.426897 14.639781,21.039056 20.648645,24.602236\")";
	path_stroke.animate({
		d: [ path_a, path_b, path_a ],
	}, as_animate_params(duration_unit, iterations));

	// Clone stroke for animation.
	let path_ink = path_stroke.cloneNode();
	path_ink.id = "icon-journal-ink";
	let s_path = path_ink.getTotalLength();
	path_ink.classList.remove("stroke-black");
	path_ink.style.stroke = c.green;
	path_ink.style.strokeWidth = 2.4; // fully cover up stroke
	path_ink.style.strokeDasharray = s_path;
	path_ink.style.strokeDashoffset = -s_path;
	svg.appendChild(path_ink);
	// NB: Remember to remove this node later!

	// Clone wiggle animation.
	path_ink.animate({
		d: [ path_a, path_b, path_a ],
	}, as_animate_params(duration_unit, iterations));

	// Draw along stroke.
	let duration = iterations * duration_unit;
	let time_a = 1 / (2 * iterations);
	let time_b = ((2 * iterations) - 1) / (2 * iterations);
	let animation = path_ink.animate({
		offset: [ 0, time_a, time_b, 1 ],
		strokeDashoffset: [ -s_path, 0, 0, s_path ],
	}, duration);

	// Repeat after a delay.
	repeat_animation([ path_ink ], svg, animation);
}

function animate_icon_music(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_clef = document.getElementById("icon-music-clef");
	let path_dot_t = document.getElementById("icon-music-dot-t");
	let path_dot_b = document.getElementById("icon-music-dot-b");

	let iterations = random_int(2, 5);

	// Squash clef.
	svg.style.overflow = "visible";
	path_clef.style.transformOrigin = "85% 34%";
	const scale_a = "scale(1, 1)";
	const scale_b = "scale(0.95, 0.85)";
	path_clef.animate({
		easing: "ease-out",
		offset: [ 0.125, 0.5, 0.875 ],
		// scale: [ "1 1", "0.95 0.85", "1 1" ],
		transform: [ scale_a, scale_b, scale_a ],
	}, as_animate_params(duration_unit/2, iterations*2));

	// Pulse top dot.
	path_dot_t.animate({
		offset: [ 0, 0.125, 0.875, 1 ],
		fill: [ c.black, c.green_d1, c.green_d1, c.black ],
	}, as_animate_params(duration_unit, iterations));

	// Pulse bottom dot.
	let animation = path_dot_b.animate({
		offset: [ 0, 0.25, 0.75, 1 ],
		fill: [ c.black, c.green, c.green, c.black ],
	},as_animate_params(duration_unit/2, iterations*2));

	// Repeat after a delay.
	repeat_animation([], svg, animation);
}

function animate_icon_resume(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_stripe_1 = document.getElementById("icon-resume-stripe-1");
	let path_stripe_2 = document.getElementById("icon-resume-stripe-2");
	let path_stripe_3 = document.getElementById("icon-resume-stripe-3");
	let path_stripe_4 = document.getElementById("icon-resume-stripe-4");

	let iterations = random_int(2, 5) * 2;
	// Cycles of 2 allow the animation to look better.
	// This also means the ratio of time this icon is animated will
	// be higher, which is good (we want it to be noticed).

	// Common params.
	// Each cycle is 2 iteration periods.
	let params = as_animate_params(duration_unit*2, iterations/2);
	let strobe_offset = [ 0, 0.125, 0.375, 0.5, 0.625, 0.875, 1 ];
	let strobe_color_1 = [ c.black, c.green, c.green, c.black, c.green_d1, c.green_d1, c.black ];
	let strobe_color_2 = [ c.black, c.green_d1, c.green_d1, c.black, c.green, c.green, c.black ];
	let strobe_1 = { offset: strobe_offset, fill: strobe_color_1 };
	let strobe_2 = { offset: strobe_offset, fill: strobe_color_2 };

	// Strobe stripes.
	path_stripe_1.animate(strobe_1, params);
	path_stripe_2.animate(strobe_2, params);
	path_stripe_3.animate(strobe_1, params);
	let animation = path_stripe_4.animate(strobe_2, params);

	// Repeat after a delay.
	repeat_animation([], svg, animation);
}

function animate_icon_software(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_node_main_a = document.getElementById("icon-software-main-node");
	let path_node_main_b = document.getElementById("icon-software-main-center");
	let path_node_base = document.getElementById("icon-software-base-node");
	let path_branch = document.getElementById("icon-software-branch");

	let iterations = random_int(2, 5);
	// If the lower bound is 1, the offsets for the branch draw
	// animation will overlap in the middle.

	// Clone nodes for animation.
	let path_node_a = path_node_main_a.cloneNode();
	let path_node_b = path_node_main_b.cloneNode();
	path_node_a.id = "icon-software-travel-node";
	path_node_b.id = "icon-software-travel-center";
	svg.appendChild(path_node_a);
	svg.appendChild(path_node_b);
	// NB: Remember to remove these nodes later!

	// Node travelling animation.
	let y_a = SVGLength_to_percent(path_node_main_a.cy.baseVal);
	let y_b = SVGLength_to_percent(path_node_base.cy.baseVal);
	let slide = { cy: [ y_a, y_b ] };
	let params = as_animate_params(duration_unit, iterations);
	path_node_a.animate(slide, params);
	path_node_b.animate(slide, params);

	// Clone stroke for animation.
	let path_accent = path_branch.cloneNode();
	path_accent.id = "icon-software-accent";
	let s_path = path_accent.getTotalLength();
	path_accent.classList.remove("stroke-black");
	path_accent.style.stroke = c.green;
	path_accent.style.strokeWidth = 3.4; // fully cover up stroke
	path_accent.style.strokeDasharray = s_path;
	path_accent.style.strokeDashoffset = -s_path;
	svg.insertBefore(path_accent, path_branch.nextElementSibling);
	// NB: Remember to remove this node later!

	// Draw along branch.
	let duration = iterations * duration_unit;
	let time_a = 1 / (2 * iterations);
	path_accent.animate({
		offset: [ 0, time_a, 1 ],
		strokeDashoffset: [ -s_path, 0, 0 ],
	}, duration);

	// Fade out branch.
	let time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_accent.animate({
		offset: [ 0, time_b, 1 ],
		opacity: [ 1, 1, 0 ],
	}, duration);

	// Repeat after a delay.
	repeat_animation([ path_node_a, path_node_b, path_accent ], svg, animation);
}

function animate_icon_projects(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_wire = document.getElementById("icon-projects-wire");
	let path_light_1 = document.getElementById("icon-projects-light-1");
	let path_light_2 = document.getElementById("icon-projects-light-2");

	let iterations = random_int(2, 5);

	// Flash lights.
	let params = as_animate_params(duration_unit, iterations);
	let strobe_1 = [ c.green_d1, c.green, c.green_d1, c.green, c.green_d1 ];
	let strobe_2 = [ c.green, c.green_d1, c.green, c.green_d1, c.green ];
	path_light_1.animate({ fill: strobe_1, easing: "step-start" }, params);
	path_light_2.animate({ fill: strobe_2, easing: "step-start" }, params);

	// Clone stroke for animation.
	let path_accent = path_wire.cloneNode();
	path_accent.id = "icon-projects-accent";
	let s_path = path_accent.getTotalLength();
	path_accent.classList.remove("stroke-black");
	path_accent.style.stroke = c.green;
	path_accent.style.strokeWidth = 1.8; // fully cover up stroke
	path_accent.style.strokeDasharray = s_path;
	path_accent.style.strokeDashoffset = -s_path;
	svg.insertBefore(path_accent, path_wire.nextElementSibling);
	// NB: Remember to remove this node later!

	// Draw along wire.
	let duration = iterations * duration_unit;
	let time_a = 1 / (4 * iterations);
	let time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_accent.animate({
		offset: [ 0, time_a, time_b, 1 ],
		strokeDashoffset: [ -s_path, 0, 0, s_path ],
	}, duration);

	// Repeat after a delay.
	repeat_animation([ path_accent ], svg, animation);
}

function animate_icon_downloads(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_triangle = document.getElementById("icon-downloads-triangle");
	let path_arrow = document.getElementById("icon-downloads-arrow");

	let iterations = random_int(2, 5);

	// Pulse triangle.
	path_triangle.style.transformOrigin = "50% 50%";
	const scale_a = "scale(1)";
	const scale_b = "scale(1.14)";
	path_triangle.animate({
		// scale: [ "1", "1.14", "1" ],
		transform: [ scale_a, scale_b, scale_a ],
	}, as_animate_params(duration_unit/2, iterations*2));

	// Bounce arrow.
	svg.style.overflow = "visible";
	const y_a = "translate(0, 0)";
	const y_b = "translate(0, 4%)";
	path_arrow.animate({
		// translate: [ "0 0", "0 4%", "0 0" ],
		transform: [ y_a, y_b, y_a ],
	}, as_animate_params(duration_unit/2, iterations*2));

	// Highlight arrow.
	let duration = iterations * duration_unit;
	let time_a = 1 / (4 * iterations);
	let time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_arrow.animate({
		offset: [ 0, time_a, time_b, 1 ],
		fill: [ c.black, c.green, c.green, c.black ],
	}, duration);

	// Repeat after a delay.
	repeat_animation([], svg, animation);
}

function animate_icon_sandbox(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_liquid = document.getElementById("icon-sandbox-liquid");
	let path_bubble_1 = document.getElementById("icon-sandbox-bubble-1");
	let path_bubble_2 = document.getElementById("icon-sandbox-bubble-2");
	let path_bubble_3 = document.getElementById("icon-sandbox-bubble-3");

	let iterations = random_int(2, 5);

	// Bubble parameters.
	function offsets_from_ticks(ticks) {
		const tick_fraction = 1/8;
		let offsets = [];
		ticks.forEach(tick => {
			offsets.push(tick * tick_fraction);
		});
		return offsets;
	}
	function get_r_list(circle) {
		let r = SVGLength_to_percent(circle.r.baseVal);
		return [ r, r, "0%", "0%", r ];
	}
	function get_transforms_list(list) {
		return [ list[0], list[1], list[1], list[0], list[0] ];
	}
	function get_keyframes(offset, transforms, circle) {
		return {
			offset: offsets_from_ticks(offset),
			r: get_r_list(circle),
			transform: get_transforms_list(transforms),
		};
	}
	let params_bubble = as_animate_params(duration_unit, iterations);

	// Bubble up bubbles.
	path_bubble_1.animate(get_keyframes(
		[ 0, 4, 4.5, 5, 6 ],
		[ "translate(0, 0)", "translate(-2%, -15%)" ],
		path_bubble_1
	), params_bubble);
	path_bubble_2.animate(get_keyframes(
		[ 1, 5, 5.5, 6, 7 ],
		[ "translate(0, 0)", "translate(6.5%, -26%)" ],
		path_bubble_2
	), params_bubble);
	path_bubble_3.animate(get_keyframes(
		[ 2, 6, 6.5, 7, 8 ],
		[ "translate(0, 0)", "translate(-6%, -38%)" ],
		path_bubble_3
	), params_bubble);

	// Light up liquid.
	let duration = iterations * duration_unit;
	let time_a = 1 / (4 * iterations);
	let time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_liquid.animate({
		offset: [ 0, time_a, time_b, 1 ],
		fill: [ c.black, c.green, c.green, c.black ],
	}, duration);

	// Repeat after a delay.
	repeat_animation([], svg, animation);
}

function animate_icon_admin(svg) {
	let c = document.colors;
	let duration_unit = document.duration_unit;

	let path_prompt = document.getElementById("icon-admin-prompt");
	let path_cursor = document.getElementById("icon-admin-cursor");

	let iterations = random_int(2, 7);
	// Simple animation -- more iterations.

	// Color prompt.
	let duration = iterations * duration_unit;
	let time_a = 1 / (4 * iterations);
	let time_b = ((4 * iterations) - 1) / (4 * iterations);
	path_prompt.animate({
		offset: [ 0, time_a, time_b, 1 ],
		fill: [ c.white, c.green, c.green, c.white ],
	}, duration);

	// Flash cursor.
	let animation = path_cursor.animate({
		opacity: [ 1, 1, 0, 1, 1 ],
	}, as_animate_params(duration_unit, iterations));

	// Repeat after a delay.
	repeat_animation([], svg, animation);
}

function animate_icon_erythro(svg) {
}

function animate_icon_unknown(svg) {
}

document.addEventListener("DOMContentLoaded", () => {
	document.duration_unit = 2000; // msec
	populate_colors();

	let circles = document.querySelectorAll(".circle > svg");
	circles.forEach(svg => {
		svg.animate_timer = delayed_animate_callback(svg)();
	});
});
