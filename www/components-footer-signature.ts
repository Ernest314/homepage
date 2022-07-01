interface IsAnimatingElement extends HTMLDivElement { is_animating: boolean; }
// Declaring these for use in the rest of the file for brevity.
const sig_en = <IsAnimatingElement>document.getElementById("signature-en");
const sig_zh = <IsAnimatingElement>document.getElementById("signature-zh");

// Swap the visible signature and start animating the shown one.
export function toggle_signature() {
	sig_en.classList.toggle("hidden");
	sig_zh.classList.toggle("hidden");
	if (!sig_en.classList.contains("hidden")) { animate_signature_en(false); }
	if (!sig_zh.classList.contains("hidden")) { animate_signature_zh(false); }
}

function get_svgpath_by_id(id: string): SVGPathElement {
	const element = document.getElementById(id);
	if (element instanceof SVGPathElement) {
		return element;
	} else {
		throw new Error(`#{id} is not an SVG path element.`);
	}
}

// When `start_shown` is false, the animation will start at the point
// where the existing signature has faded out completely (the writing
// will play starting on a blank screen).
function animate_signature_en(start_shown = true) {
	const signature = sig_en;
	const ids = [ "e", "g", "." ];
	const path: { [key: string]: SVGPathElement } = {
		"e": get_svgpath_by_id("signature-e"),
		"g": get_svgpath_by_id("signature-g"),
		".": get_svgpath_by_id("signature-dot"),
	};
	let length: { [key: string]: number } = {};
	
	// Don't overwrite animations in progress.
	if (signature.is_animating) {
		return;
	} else {
		signature.is_animating = true;
	}

	// Init length data + stroke properties.
	for (const id of ids) {
		length[id] = path[id].getTotalLength();
		path[id].style.strokeDasharray = length[id].toString();
	}

	// Define animation. (All timings in msec.)
	const params: KeyframeAnimationOptions = {
		duration: 1200,
		endDelay: 200,
		fill: "forwards",
	};
	function s(id: string) { return length[id]; }
	const keyframes: { [key: string]: PropertyIndexedKeyframes } = {
		"e": {
			offset          : [ 0.0000, 0.1000, 0.1500, 0.2000, 0.2500, 0.5500 ],
			opacity         : [      1,      0,      0,      1,      1,      1 ],
			strokeDashoffset: [      0,      0, s("e"), s("e"), s("e"),      0 ],
		},
		"g": {
			offset          : [ 0.0000, 0.1000, 0.1500, 0.2000, 0.4000, 0.8000 ],
			opacity         : [      1,      0,      0,      1,      1,      1 ],
			strokeDashoffset: [      0,      0, s("g"), s("g"), s("g"),      0 ],
		},
		".": {
			offset          : [ 0.0000, 0.1000, 0.1500, 0.2000, 0.9000, 1.0000 ],
			opacity         : [      1,      0,      0,      1,      1,      1 ],
			strokeDashoffset: [      0,      0, s("."), s("."), s("."),      0 ],
		},
	};

	// Trigger animation.
	let animation_i = null;
	for (const id of ids) {
		animation_i = path[id].animate(keyframes[id], params);
		if (!start_shown) { animation_i.currentTime = 180; }
	}

	// Cleanup after animation.
	if (animation_i === null) {
		throw new Error("Cannot unset `is_animating` flag.");
	}
	animation_i.addEventListener("finish", () =>
		signature.is_animating = false
	);
}

// When `start_shown` is false, the animation will start at the point
// where the existing signature has faded out completely (the writing
// will play starting on a blank screen).
function animate_signature_zh(start_shown = true) {
	const signature = sig_zh;
	const ids = [ "x1", "x2", "x3", "x4", "z1", "z2", "z3", "z4" ];
	const path: { [key: string]: SVGPathElement } = {
		"x1": get_svgpath_by_id("signature-x-1"),
		"x2": get_svgpath_by_id("signature-x-2"),
		"x3": get_svgpath_by_id("signature-x-3"),
		"x4": get_svgpath_by_id("signature-x-4"),
		"z1": get_svgpath_by_id("signature-z-1"),
		"z2": get_svgpath_by_id("signature-z-2"),
		"z3": get_svgpath_by_id("signature-z-3"),
		"z4": get_svgpath_by_id("signature-z-4"),
	};
	let length: { [key: string]: number } = {};

	// Don't overwrite animations in progress.
	if (signature.is_animating) {
		return;
	} else {
		signature.is_animating = true;
	}

	// Init length data + stroke properties.
	for (const id of ids) {
		length[id] = path[id].getTotalLength();
		path[id].style.strokeDasharray = length[id].toString();
	}

	// Define animation. (All timings in msec.)
	const params: KeyframeAnimationOptions = {
		duration: 1800,
		endDelay: 200,
		fill: "forwards",
	};
	function s(id: string) { return length[id]; }
	const keyframes: { [key: string]: PropertyIndexedKeyframes } = {
		"x1": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.1600,  0.3400 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x1"), s("x1"), s("x1"),       0 ],
		},
		"x2": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.3600,  0.4600 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x2"), s("x2"), s("x2"),       0 ],
		},
		"x3": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.4800,  0.6200 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x3"), s("x3"), s("x3"),       0 ],
		},
		"x4": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.6400,  0.7600 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x4"), s("x4"), s("x4"),       0 ],
		},
		"z1": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.4400,  0.5600 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z1"), s("z1"), s("z1"),       0 ],
		},
		"z2": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.6200,  0.7000 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z2"), s("z2"), s("z2"),       0 ],
		},
		"z3": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.7200,  0.9000 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z3"), s("z3"), s("z3"),       0 ],
		},
		"z4": {
			offset          : [  0.0000,  0.0677,  0.1000,  0.1333,  0.9200,  1.0000 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z4"), s("z4"), s("z4"),       0 ],
		},
	};

	// Trigger animation.
	let animation_i = null;
	for (const id of ids) {
		animation_i = path[id].animate(keyframes[id], params);
		if (!start_shown) { animation_i.currentTime = 240; }
	}

	// Cleanup after animation.
	if (animation_i === null) {
		throw new Error("Cannot unset `is_animating` flag.");
	}
	animation_i.addEventListener("finish", () =>
		signature.is_animating = false
	);
}

document.addEventListener("DOMContentLoaded", () => {
	sig_en.is_animating = false;
	sig_zh.is_animating = false;

	sig_en.addEventListener("mouseenter", () => animate_signature_en(true));
	sig_zh.addEventListener("mouseenter", () => animate_signature_zh(true));

	sig_en.addEventListener("click", toggle_signature);
	sig_zh.addEventListener("click", toggle_signature);
});
