// Bounds: [min, max)
function random_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	let range = max - min;
	return Math.floor(Math.random() * range + min);
}

function animate_icon_journal() {
	let svg = document.getElementById("icon-journal");
	let path_nib = document.getElementById("icon-journal-nib");
	let path_stroke = document.getElementById("icon-journal-stroke");

	const duration_unit = 2000;
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
	}, {
		duration: duration_unit,
		iterations: iterations,
	});

	// Wiggle stroke.
	const path_a = "path(\"M 5.4357436,23.781416 C 12.559248,20.47079 14.379922,27.133922 20.648645,24.602236\")";
	const path_b = "path(\"M 5.4357436,23.781416 C 10.267767,27.426897 14.639781,21.039056 20.648645,24.602236\")";
	path_stroke.animate({
		d: [ path_a, path_b, path_a ],
	},{
		duration: duration_unit,
		iterations: iterations,
	});

	// Clone stroke for animation.
	let path_ink = path_stroke.cloneNode();
	path_ink.id = "icon-journal-ink";
	let s_path = path_ink.getTotalLength();
	path_ink.classList.remove("stroke-black");
	path_ink.style.stroke =
		getComputedStyle(svg).getPropertyValue("--c-green-d1");
	path_ink.style.strokeWidth = 2.4; // fully cover up stroke
	path_ink.style.strokeDasharray = s_path;
	path_ink.style.strokeDashoffset = -s_path;
	svg.appendChild(path_ink);
	// NB: Remember to remove this node later!

	// Clone wiggle animation.
	path_ink.animate({
		d: [ path_a, path_b, path_a ],
	},{
		duration: duration_unit,
		iterations: iterations,
	});

	// Draw along stroke.
	let duration = iterations * duration_unit;
	let time_a = 1 / (2 * iterations);
	let time_b = ((2 * iterations) - 1) / (2 * iterations);
	let animation = path_ink.animate({
		offset: [ 0, time_a, time_b, 1 ],
		strokeDashoffset: [ -s_path, 0, 0, s_path ],
	}, duration);

	// Repeat after a delay.
	let delay_units = random_int(2, 9);
	animation.addEventListener("finish", () => {
		svg.removeChild(path_ink);
		setTimeout(animate_icon_journal, delay_units * duration_unit);
	});
}

function animate_icon_music() {
	let svg = document.getElementById("icon-music");
	let path_clef = document.getElementById("icon-music-clef");
	let path_dot_t = document.getElementById("icon-music-dot-t");
	let path_dot_b = document.getElementById("icon-music-dot-b");

	const duration_unit = 2000;
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
	},{
		duration: duration_unit / 2,
		iterations: iterations * 2,
	});

	// Common colors.
	let style = getComputedStyle(svg);
	let color_black = style.getPropertyValue("--c-gray-d2");
	let color_green_1 = style.getPropertyValue("--c-green-d1");
	let color_green_2 = style.getPropertyValue("--c-green-d2");

	// Pulse top dot.
	path_dot_t.animate({
		offset: [ 0, 0.125, 0.875, 1 ],
		fill: [ color_black, color_green_2, color_green_2, color_black ],
	},{
		duration: duration_unit,
		iterations: iterations,
	});

	// Pulse bottom dot.
	let animation = path_dot_b.animate({
		offset: [ 0, 0.25, 0.75, 1 ],
		fill: [ color_black, color_green_1, color_green_1, color_black ],
	},{
		duration: duration_unit / 2,
		iterations: iterations * 2,
	});

	// Repeat after a delay.
	let delay_units = random_int(2, 9);
	animation.addEventListener("finish", () => {
		setTimeout(animate_icon_music, delay_units * duration_unit);
	});
}

function animate_icon_resume() {
	let svg = document.getElementById("icon-resume");
	let path_stripe_1 = document.getElementById("icon-resume-stripe-1");
	let path_stripe_2 = document.getElementById("icon-resume-stripe-2");
	let path_stripe_3 = document.getElementById("icon-resume-stripe-3");
	let path_stripe_4 = document.getElementById("icon-resume-stripe-4");

	const duration_unit = 2000;
	let iterations = random_int(2, 4) * 2;
	// Cycles of 2 allow the animation to look better.

	let style = getComputedStyle(svg);
	let color_green_1 = style.getPropertyValue("--c-green-d1");
	let color_green_2 = style.getPropertyValue("--c-green-d2");
	let color_black = style.getPropertyValue("--c-gray-d2");

	// Common params.
	let params = {
		duration: duration_unit * 2,
		iterations: iterations / 2,
	}; // Each cycle is 2 iteration periods.
	let strobe_offset = [ 0, 0.125, 0.375, 0.5, 0.625, 0.875, 1 ];
	let strobe_color_1 = [ color_black, color_green_1, color_green_1, color_black, color_green_2, color_green_2, color_black ];
	let strobe_color_2 = [ color_black, color_green_2, color_green_2, color_black, color_green_1, color_green_1, color_black ];
	let strobe_1 = { offset: strobe_offset, fill: strobe_color_1 };
	let strobe_2 = { offset: strobe_offset, fill: strobe_color_2 };

	// Strobe stripes.
	path_stripe_1.animate(strobe_1, params);
	path_stripe_2.animate(strobe_2, params);
	path_stripe_3.animate(strobe_1, params);
	let animation = path_stripe_4.animate(strobe_2, params);

	// Repeat after a delay.
	let delay_units = random_int(2, 9);
	animation.addEventListener("finish", () => {
		setTimeout(animate_icon_resume, delay_units * duration_unit);
	});
}

function animate_icon_software() {
	let svg = document.getElementById("icon-software");
	let path_node_main_a = document.getElementById("icon-software-main-node");
	let path_node_main_b = document.getElementById("icon-software-main-center");
	let path_node_base = document.getElementById("icon-software-base-node");
	let path_branch = document.getElementById("icon-software-branch");

	const duration_unit = 2000;
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
	function SVGLength_to_percent(svglength) {
		svglength.convertToSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE);
		return svglength.valueAsString;
	}
	let y_a = SVGLength_to_percent(path_node_main_a.cy.baseVal);
	let y_b = SVGLength_to_percent(path_node_base.cy.baseVal);
	path_node_a.animate({
		cy: [ y_a, y_b ]
	},{
		duration: duration_unit,
		iterations: iterations,
	});
	path_node_b.animate({
		cy: [ y_a, y_b ]
	},{
		duration: duration_unit,
		iterations: iterations,
	});

	// Clone stroke for animation.
	let path_accent = path_branch.cloneNode();
	path_accent.id = "icon-software-accent";
	let s_path = path_accent.getTotalLength();
	path_accent.classList.remove("stroke-black");
	path_accent.style.stroke =
		getComputedStyle(svg).getPropertyValue("--c-green-d1");
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
	let delay_units = random_int(2, 9);
	animation.addEventListener("finish", () => {
		svg.removeChild(path_node_a);
		svg.removeChild(path_node_b);
		svg.removeChild(path_accent);
		setTimeout(animate_icon_software, delay_units * duration_unit);
	});
}

function animate_icon_projects() {
	let svg = document.getElementById("icon-projects");
	let path_wire = document.getElementById("icon-projects-wire");
	let path_light_1 = document.getElementById("icon-projects-light-1");
	let path_light_2 = document.getElementById("icon-projects-light-2");

	const duration_unit = 2000;
	let iterations = random_int(2, 5);

	// Common colors.
	let style = getComputedStyle(svg);
	let color_black = style.getPropertyValue("--c-gray-d2");
	let color_green_1 = style.getPropertyValue("--c-green-d1");
	let color_green_2 = style.getPropertyValue("--c-green-d2");

	// Flash lights.
	let params = {
		duration: duration_unit,
		iterations: iterations,
	};
	let strobe_1 = [ color_green_2, color_green_1, color_green_2, color_green_1, color_green_2 ];
	let strobe_2 = [ color_green_1, color_green_2, color_green_1, color_green_2, color_green_1 ];
	path_light_1.animate({ fill: strobe_1, easing: "step-start" }, params);
	path_light_2.animate({ fill: strobe_2, easing: "step-start" }, params);

	// Clone stroke for animation.
	let path_accent = path_wire.cloneNode();
	path_accent.id = "icon-projects-accent";
	let s_path = path_accent.getTotalLength();
	path_accent.classList.remove("stroke-black");
	path_accent.style.stroke =
		getComputedStyle(svg).getPropertyValue("--c-green-d1");
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
	let delay_units = random_int(2, 9);
	animation.addEventListener("finish", () => {
		svg.removeChild(path_accent);
		setTimeout(animate_icon_projects, delay_units * duration_unit);
	});
}

function animate_icon_downloads() {

}

function animate_icon_sandbox() {

}

function animate_icon_admin() {
	let svg = document.getElementById("icon-admin");
	let path_prompt = document.getElementById("icon-admin-prompt");
	let path_cursor = document.getElementById("icon-admin-cursor");

	const duration_unit = 2000;
	let iterations = random_int(2, 7);
	// Simple animation -- more iterations.

	// Color prompt.
	let duration = iterations * duration_unit;
	let time_a = 1 / (4 * iterations);
	let time_b = ((4 * iterations) - 1) / (4 * iterations);
	let style = getComputedStyle(svg);
	let color_green = style.getPropertyValue("--c-green-d1");
	let color_white = style.getPropertyValue("--c-gray-l2");
	path_prompt.animate({
		offset: [ 0, time_a, time_b, 1 ],
		fill: [ color_white, color_green, color_green, color_white ],
	}, duration);

	// Flash cursor.
	let animation = path_cursor.animate({
		opacity: [ 1, 1, 0, 1, 1 ],
	},{
		duration: duration_unit,
		iterations: iterations,
	});

	// Repeat after a delay.
	let delay_units = random_int(2, 9);
	animation.addEventListener("finish", () => {
		setTimeout(animate_icon_admin, delay_units * duration_unit);
	});
}

function animate_icon_erythro() {

}

function animate_icon_unknown() {

}

function animate_icon(id) {
	switch (id) {
		case "icon-journal"  : animate_icon_journal()  ; break;
		case "icon-music"    : animate_icon_music()    ; break;
		case "icon-resume"   : animate_icon_resume()   ; break;
		case "icon-software" : animate_icon_software() ; break;
		case "icon-projects" : animate_icon_projects() ; break;
		case "icon-downloads": animate_icon_downloads(); break;
		case "icon-sandbox"  : animate_icon_sandbox()  ; break;
		case "icon-admin"    : animate_icon_admin()    ; break;
		case "icon-erythro"  : animate_icon_erythro()  ; break;
		case "icon-unknown"  : animate_icon_unknown()  ; break;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	let circles = document.querySelectorAll(".circle > svg");
	circles.forEach((svg) => {
		let duration = random_int(2, 9) * 2000;
		setTimeout(() => { animate_icon(svg.id); }, duration);
	});
});
