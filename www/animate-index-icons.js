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
	path_nib.animate({
		rotate: [ "0deg", "5deg", "0deg", "-5deg", "0deg" ],
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
	let delay_units = random_int(2, 7);
	animation.addEventListener("finish", () => {
		svg.removeChild(path_ink);
		setTimeout(animate_icon_journal, delay_units * duration_unit);
	});
}

function animate_icon_music() {

}

function animate_icon_resume() {

}

function animate_icon_software() {

}

function animate_icon_projects() {

}

function animate_icon_downloads() {

}

function animate_icon_sandbox() {

}

function animate_icon_admin() {

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
		let duration = random_int(1, 5) * 2000;
		setTimeout(() => { animate_icon(svg.id); }, duration);
	});
});
