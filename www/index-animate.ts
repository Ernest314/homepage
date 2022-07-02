import { random_int } from "./util.js";
import { populate_colors } from "./theme.js";

declare global { interface Document { duration_unit: number; } }
export interface AnimatedSVGElement extends SVGElement {
	is_animating: boolean;
	animate_timer: number; // the ID for callback's setTimeout()
	animate_cleanup?: () => void;
}

function get_path_from_id(id: string): SVGGeometryElement {
	const element = document.getElementById(id);
	if (element === null || !(element instanceof SVGGeometryElement)) {
		throw new Error("Specified SVG element is invalid.");
	}
	return element;
}
function SVGLength_to_percent(svglength: SVGLength): string {
	svglength.convertToSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE);
	return svglength.valueAsString;
}
function set_temporary(element: SVGElement) {
	element.removeAttribute("id");
	element.classList.add("animate-temporary");
}
function as_options(duration: number, iterations: number): KeyframeAnimationOptions {
	return {
		duration: duration,
		iterations: iterations,
	};
}

export function animate_icon(svg: AnimatedSVGElement) {
	const handlers: { [key: string]: (svg: AnimatedSVGElement) => void } = {
		"icon-journal"  : animate_icon_journal  ,
		"icon-music"    : animate_icon_music    ,
		"icon-resume"   : animate_icon_resume   ,
		"icon-software" : animate_icon_software ,
		"icon-projects" : animate_icon_projects ,
		"icon-downloads": animate_icon_downloads,
		"icon-sandbox"  : animate_icon_sandbox  ,
		"icon-admin"    : animate_icon_admin    ,
		"icon-erythro"  : animate_icon_erythro  ,
		"icon-unknown"  : animate_icon_unknown  ,
	};

	svg.is_animating = true;
	handlers[svg.id](svg);
}
export function delayed_animate_callback(svg: SVGElement) {
	let delay_unit = document.duration_unit;
	let delay = random_int(2, 9) * delay_unit;
	return () => {
		return setTimeout(animate_icon, delay, svg);
	};
}
function repeat_animation(svg: AnimatedSVGElement, animation: Animation) {
	// Define cleanup function separately so it can be used to compare
	// against later.
	let cleanup = () => {
		svg.is_animating = false;
		let elements = svg.querySelectorAll(".animate-temporary");
		for (let element of elements) {
			svg.removeChild(element);
		}
	};

	svg.animate_cleanup = cleanup;
	animation.addEventListener("finish", () => {
		// Only clean up if the cleanup wasn't overwritten.
		// An overwriting cleanup will clean up later.
		if (svg.animate_cleanup === cleanup) {
			svg.animate_cleanup();
			svg.animate_timer = delayed_animate_callback(svg)();
		}
	});
}

function animate_icon_journal(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 5);
	// If the lower bound is 1, the offsets for the stroke draw
	// animation will overlap in the middle.

	let path_nib = get_path_from_id("icon-journal-nib");
	let path_stroke = get_path_from_id("icon-journal-stroke");

	// Rotate pen.
	svg.style.overflow = "visible";
	path_nib.style.transformOrigin = "88% 96%";
	const rotate_m = "rotate(0deg)";
	const rotate_a = "rotate(5deg)";
	const rotate_b = "rotate(-5deg)";
	path_nib.animate({
		// rotate: [ "0deg", "5deg", "0deg", "-5deg", "0deg" ],
		transform: [ rotate_m, rotate_a, rotate_m, rotate_b, rotate_m ],
	}, as_options(duration_unit, iterations));

	// Wiggle stroke.
	const path_a = "path(\"M 5.4357436,23.781416 C 12.559248,20.47079 14.379922,27.133922 20.648645,24.602236\")";
	const path_b = "path(\"M 5.4357436,23.781416 C 10.267767,27.426897 14.639781,21.039056 20.648645,24.602236\")";
	path_stroke.animate({
		d: [ path_a, path_b, path_a ],
	}, as_options(duration_unit, iterations));

	// Clone stroke for animation.
	let path_ink = path_stroke.cloneNode(true) as SVGGeometryElement;
	set_temporary(path_ink);
	const s_path = path_ink.getTotalLength();
	path_ink.classList.remove("stroke-black");
	path_ink.style.stroke = c.green;
	path_ink.style.strokeWidth = "2.4"; // fully cover up stroke
	path_ink.style.strokeDasharray = s_path.toString();
	path_ink.style.strokeDashoffset = (-s_path).toString();
	svg.appendChild(path_ink);

	// Clone wiggle animation.
	path_ink.animate({
		d: [ path_a, path_b, path_a ],
	}, as_options(duration_unit, iterations));

	// Draw along stroke.
	const duration = iterations * duration_unit;
	const time_a = 1 / (2 * iterations);
	const time_b = ((2 * iterations) - 1) / (2 * iterations);
	let animation = path_ink.animate({
		offset: [ 0, time_a, time_b, 1 ],
		strokeDashoffset: [ -s_path, 0, 0, s_path ],
	}, duration);

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_music(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 5);

	let path_clef = get_path_from_id("icon-music-clef");
	let path_dot_t = get_path_from_id("icon-music-dot-t");
	let path_dot_b = get_path_from_id("icon-music-dot-b");


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
	}, as_options(duration_unit/2, iterations*2));

	// Pulse top dot.
	path_dot_t.animate({
		offset: [ 0, 0.125, 0.875, 1 ],
		fill: [ c.black, c.green_d1, c.green_d1, c.black ],
	}, as_options(duration_unit, iterations));

	// Pulse bottom dot.
	let animation = path_dot_b.animate({
		offset: [ 0, 0.25, 0.75, 1 ],
		fill: [ c.black, c.green, c.green, c.black ],
	},as_options(duration_unit/2, iterations*2));

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_resume(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 5) * 2;
	// Cycles of 2 allow the animation to look better.
	// This also means the ratio of time this icon is animated will
	// be higher, which is good (we want it to be noticed).

	let path_stripe_1 = get_path_from_id("icon-resume-stripe-1");
	let path_stripe_2 = get_path_from_id("icon-resume-stripe-2");
	let path_stripe_3 = get_path_from_id("icon-resume-stripe-3");
	let path_stripe_4 = get_path_from_id("icon-resume-stripe-4");


	// Common params.
	// Each cycle is 2 iteration periods.
	const params = as_options(duration_unit*2, iterations/2);
	const strobe_offset = [ 0, 0.125, 0.375, 0.5, 0.625, 0.875, 1 ];
	const strobe_color_1 = [ c.black, c.green, c.green, c.black, c.green_d1, c.green_d1, c.black ];
	const strobe_color_2 = [ c.black, c.green_d1, c.green_d1, c.black, c.green, c.green, c.black ];
	const strobe_1 = { offset: strobe_offset, fill: strobe_color_1 };
	const strobe_2 = { offset: strobe_offset, fill: strobe_color_2 };

	// Strobe stripes.
	path_stripe_1.animate(strobe_1, params);
	path_stripe_2.animate(strobe_2, params);
	path_stripe_3.animate(strobe_1, params);
	let animation = path_stripe_4.animate(strobe_2, params);

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_software(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 5);
	// If the lower bound is 1, the offsets for the branch draw
	// animation will overlap in the middle.

	let path_node_main_a = get_path_from_id("icon-software-main-node") as SVGCircleElement;
	let path_node_main_b = get_path_from_id("icon-software-main-center") as SVGCircleElement;
	let path_node_base = get_path_from_id("icon-software-base-node") as SVGCircleElement;
	let path_branch = get_path_from_id("icon-software-branch");


	// Clone nodes for animation.
	let path_node_a = path_node_main_a.cloneNode() as SVGCircleElement;
	let path_node_b = path_node_main_b.cloneNode() as SVGCircleElement;
	set_temporary(path_node_a);
	set_temporary(path_node_b);
	svg.appendChild(path_node_a);
	svg.appendChild(path_node_b);

	// Node travelling animation.
	const y_a = SVGLength_to_percent(path_node_main_a.cy.baseVal);
	const y_b = SVGLength_to_percent(path_node_base.cy.baseVal);
	const slide = { cy: [ y_a, y_b ] };
	const params = as_options(duration_unit, iterations);
	path_node_a.animate(slide, params);
	path_node_b.animate(slide, params);

	// Clone stroke for animation.
	let path_accent = path_branch.cloneNode() as SVGGeometryElement;
	set_temporary(path_accent);
	const s_path = path_accent.getTotalLength();
	path_accent.classList.remove("stroke-black");
	path_accent.style.stroke = c.green;
	path_accent.style.strokeWidth = "3.4"; // fully cover up stroke
	path_accent.style.strokeDasharray = s_path.toString();
	path_accent.style.strokeDashoffset = (-s_path).toString();
	svg.insertBefore(path_accent, path_branch.nextElementSibling);

	// Draw along branch.
	const duration = iterations * duration_unit;
	const time_a = 1 / (2 * iterations);
	path_accent.animate({
		offset: [ 0, time_a, 1 ],
		strokeDashoffset: [ -s_path, 0, 0 ],
	}, duration);

	// Fade out branch.
	const time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_accent.animate({
		offset: [ 0, time_b, 1 ],
		opacity: [ 1, 1, 0 ],
	}, duration);

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_projects(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 5);

	let path_wire = get_path_from_id("icon-projects-wire");
	let path_light_1 = get_path_from_id("icon-projects-light-1");
	let path_light_2 = get_path_from_id("icon-projects-light-2");

	// Flash lights.
	const params = as_options(duration_unit, iterations);
	const strobe_1 = [ c.green_d1, c.green, c.green_d1, c.green, c.green_d1 ];
	const strobe_2 = [ c.green, c.green_d1, c.green, c.green_d1, c.green ];
	path_light_1.animate({ fill: strobe_1, easing: "step-start" }, params);
	path_light_2.animate({ fill: strobe_2, easing: "step-start" }, params);

	// Clone stroke for animation.
	let path_accent = path_wire.cloneNode() as SVGGeometryElement;
	set_temporary(path_accent);
	const s_path = path_accent.getTotalLength();
	path_accent.classList.remove("stroke-black");
	path_accent.style.stroke = c.green;
	path_accent.style.strokeWidth = "1.8"; // fully cover up stroke
	path_accent.style.strokeDasharray = s_path.toString();
	path_accent.style.strokeDashoffset = (-s_path).toString();
	svg.insertBefore(path_accent, path_wire.nextElementSibling);

	// Draw along wire.
	const duration = iterations * duration_unit;
	const time_a = 1 / (4 * iterations);
	const time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_accent.animate({
		offset: [ 0, time_a, time_b, 1 ],
		strokeDashoffset: [ -s_path, 0, 0, s_path ],
	}, duration);

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_downloads(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 5);

	let path_triangle = get_path_from_id("icon-downloads-triangle");
	let path_arrow = get_path_from_id("icon-downloads-arrow");

	// Pulse triangle.
	path_triangle.style.transformOrigin = "50% 50%";
	const scale_a = "scale(1)";
	const scale_b = "scale(1.14)";
	path_triangle.animate({
		// scale: [ "1", "1.14", "1" ],
		transform: [ scale_a, scale_b, scale_a ],
	}, as_options(duration_unit/2, iterations*2));

	// Bounce arrow.
	svg.style.overflow = "visible";
	const y_a = "translate(0, 0)";
	const y_b = "translate(0, 4%)";
	path_arrow.animate({
		// translate: [ "0 0", "0 4%", "0 0" ],
		transform: [ y_a, y_b, y_a ],
	}, as_options(duration_unit/2, iterations*2));

	// Highlight arrow.
	const duration = iterations * duration_unit;
	const time_a = 1 / (4 * iterations);
	const time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_arrow.animate({
		offset: [ 0, time_a, time_b, 1 ],
		fill: [ c.black, c.green, c.green, c.black ],
	}, duration);

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_sandbox(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 5);

	let path_liquid = get_path_from_id("icon-sandbox-liquid");
	let path_bubble_1 = get_path_from_id("icon-sandbox-bubble-1") as SVGCircleElement;
	let path_bubble_2 = get_path_from_id("icon-sandbox-bubble-2") as SVGCircleElement;
	let path_bubble_3 = get_path_from_id("icon-sandbox-bubble-3") as SVGCircleElement;

	// Bubble parameters.
	function offsets_from_ticks(ticks: number[]) {
		const tick_fraction = 1/8;
		let offsets: number[] = [];
		for (const tick of ticks) {
			offsets.push(tick * tick_fraction);
		}
		return offsets;
	}
	function get_r_list(circle: SVGCircleElement) {
		let r = SVGLength_to_percent(circle.r.baseVal);
		return [ r, r, "0%", "0%", r ];
	}
	function get_transforms_list(list: string[]) {
		return [ list[0], list[1], list[1], list[0], list[0] ];
	}
	function get_keyframes(offset: number[], transforms: string[], circle: SVGCircleElement) {
		return {
			offset: offsets_from_ticks(offset),
			r: get_r_list(circle),
			transform: get_transforms_list(transforms),
		};
	}
	let params_bubble = as_options(duration_unit, iterations);

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
	const duration = iterations * duration_unit;
	const time_a = 1 / (4 * iterations);
	const time_b = ((4 * iterations) - 1) / (4 * iterations);
	let animation = path_liquid.animate({
		offset: [ 0, time_a, time_b, 1 ],
		fill: [ c.black, c.green, c.green, c.black ],
	}, duration);

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_admin(svg: AnimatedSVGElement) {
	const c = document.colors;
	const duration_unit = document.duration_unit;
	const iterations = random_int(2, 7);
	// Simple animation -- more iterations.

	let path_prompt = get_path_from_id("icon-admin-prompt");
	let path_cursor = get_path_from_id("icon-admin-cursor");

	// Color prompt.
	const duration = iterations * duration_unit;
	const time_a = 1 / (4 * iterations);
	const time_b = ((4 * iterations) - 1) / (4 * iterations);
	path_prompt.animate({
		offset: [ 0, time_a, time_b, 1 ],
		fill: [ c.white, c.green, c.green, c.white ],
	}, duration);

	// Flash cursor.
	let animation = path_cursor.animate({
		opacity: [ 1, 1, 0, 1, 1 ],
	}, as_options(duration_unit, iterations));

	// Repeat after a delay.
	repeat_animation(svg, animation);
}

function animate_icon_erythro(svg: AnimatedSVGElement) {
}

function animate_icon_unknown(svg: AnimatedSVGElement) {
}

document.addEventListener("DOMContentLoaded", () => {
	// Initialize global variables.
	document.duration_unit = 2000; // msec
	populate_colors();

	let svgs = document.querySelectorAll(".circle > svg");
	for (let svg of svgs) {
		if (!(svg instanceof SVGElement)) {
			throw new Error("Couldn't initialize icon for animation.");
		}
		
		let svg_i = svg as AnimatedSVGElement;
		svg_i.animate_timer = delayed_animate_callback(svg_i)();
	}
});
