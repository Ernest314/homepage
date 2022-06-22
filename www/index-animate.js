function animate_signature_en(start_shown = true) {
	const ids = [ "e", "g", "." ];
	let path = {
		"e": document.getElementById("signature-e"),
		"g": document.getElementById("signature-g"),
		".": document.getElementById("signature-dot"),
	};
	let length = {};
	let signature = document.getElementById("signature-en");
	
	console.info(signature);
	console.info("start_shown: ", start_shown);
	console.info("is_animating: ", signature.is_animating);
	
	// Don't overwrite animations in progress.
	if (signature.is_animating) {
		return;
	} else {
		signature.is_animating = true;
	}

	// Init length data + stroke properties.
	ids.forEach((id) => {
		length[id] = path[id].getTotalLength();
		path[id].style.strokeDasharray = length[id];
	});

	// Define animation. (All timings in msec.)
	let params = {
		duration: 1200,
		delayEnd: 200,
		fill: "forwards",
	};
	function s(id) { return length[id]; }
	let keyframes = {
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
	ids.forEach((id) => {
		animation_i = path[id].animate(keyframes[id], params);
		if (!start_shown) {
			animation_i.currentTime = 180;
		}
	});
	animation_i.addEventListener("finish", () => {
		signature.is_animating = false;
	});
}

function animate_signature_zh(start_shown = true) {
	const ids = [ "x1", "x2", "x3", "x4", "z1", "z2", "z3", "z4" ];
	let path = {
		"x1": document.getElementById("signature-x-1"),
		"x2": document.getElementById("signature-x-2"),
		"x3": document.getElementById("signature-x-3"),
		"x4": document.getElementById("signature-x-4"),
		"z1": document.getElementById("signature-z-1"),
		"z2": document.getElementById("signature-z-2"),
		"z3": document.getElementById("signature-z-3"),
		"z4": document.getElementById("signature-z-4"),
	};
	let length = {};
	let signature = document.getElementById("signature-zh");
	
	console.info(signature);
	console.info("start_shown: ", start_shown);
	console.info("is_animating: ", signature.is_animating);

	// Don't overwrite animations in progress.
	if (signature.is_animating) {
		return;
	} else {
		signature.is_animating = true;
	}

	// Init length data + stroke properties.
	ids.forEach((id) => {
		length[id] = path[id].getTotalLength();
		path[id].style.strokeDasharray = length[id];
	});

	// Define animation. (All timings in msec.)
	let params = {
		duration: 1800,
		delayEnd: 200,
		fill: "forwards",
	};
	function s(id) { return length[id]; }
	let keyframes = {
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
	ids.forEach((id) => {
		animation_i = path[id].animate(keyframes[id], params);
		if (!start_shown) {
			animation_i.currentTime = 240;
		}
	});
	animation_i.addEventListener("finish", () => {
		signature.is_animating = false;
	});
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#signature-en").is_animating = false;
	document.querySelector("#signature-zh").is_animating = false;

	document.querySelector("#signature-en")
		.addEventListener("mouseenter", () => {
			animate_signature_en(true);
		});
	document.querySelector("#signature-zh")
		.addEventListener("mouseenter", () => {
			animate_signature_zh(true);
		});
});
