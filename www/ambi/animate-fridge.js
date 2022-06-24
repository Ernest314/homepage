function animate_ag() {
	const ids = [ "ag", "." ];
	let path = {
		"ag": document.getElementById("ag-stroke"),
		"." : document.getElementById("ag-dot"),
	};
	let length = {};
	let text = document.getElementById("ag");

	// Don't overwrite animations in progress.
	if (text.is_animating) {
		return;
	} else {
		text.is_animating = true;
	}

	// Init length data + stroke properties.
	ids.forEach((id) => {
		length[id] = path[id].getTotalLength();
		path[id].style.strokeDasharray = length[id];
	});

	// Define animation. (All timings in msec.)
	const params = {
		duration: 1800,
		delayEnd: 200,
		fill: "forwards",
	};
	function s(id) { return length[id]; }
	let keyframes = {
		"ag": {
			offset          : [  0.0000,  0.1000,  0.1500,  0.2000,  0.2500,  0.8800 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("ag"), s("ag"), s("ag"),       0 ],
		},
		".": {
			offset          : [ 0.0000, 0.1000, 0.1500, 0.2000, 0.9400, 1.0000 ],
			opacity         : [      1,      0,      0,      1,      1,      1 ],
			strokeDashoffset: [      0,      0, s("."), s("."), s("."),      0 ],
		},
	};

	// Trigger animation.
	let animation_i = null;
	ids.forEach((id) => {
		animation_i = path[id].animate(keyframes[id], params);
	});
	animation_i.addEventListener("finish", () => {
		text.is_animating = false;
	});
}

function animate_xs() {
	const ids = [ "x1", "x2", "x3", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14" ];
	let path = {
		"x1": document.getElementById("xs-x-1"),
		"x2": document.getElementById("xs-x-2"),
		"x3": document.getElementById("xs-x-3"),
		"s1": document.getElementById("xs-s-1"),
		"s2": document.getElementById("xs-s-2"),
		"s3": document.getElementById("xs-s-3"),
		"s4": document.getElementById("xs-s-4"),
		"s5": document.getElementById("xs-s-5"),
		"s6": document.getElementById("xs-s-6"),
		"s7": document.getElementById("xs-s-7"),
		"s8": document.getElementById("xs-s-8"),
		"s9": document.getElementById("xs-s-9"),
		"s10": document.getElementById("xs-s-10"),
		"s11": document.getElementById("xs-s-11"),
		"s12": document.getElementById("xs-s-12"),
		"s13": document.getElementById("xs-s-13"),
		"s14": document.getElementById("xs-s-14"),
	};
	let length = {};
	let text = document.getElementById("xs");

	// Don't overwrite animations in progress.
	if (text.is_animating) {
		return;
	} else {
		text.is_animating = true;
	}

	// Init length data + stroke properties.
	ids.forEach((id) => {
		length[id] = path[id].getTotalLength();
		path[id].style.strokeDasharray = length[id];
	});

	// Define animation. (All timings in msec.)
	const params = {
		duration: 2800,
		delayEnd: 200,
		fill: "forwards",
	};
	function s(id) { return length[id]; }
	let keyframes = {
		"x1": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.1000,  0.2100 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x1"), s("x1"), s("x1"),       0 ],
		},
		"x2": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.2400,  0.2700 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x2"), s("x2"), s("x2"),       0 ],
		},
		"x3": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.3200,  0.3900 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x3"), s("x3"), s("x3"),       0 ],
		},
		"s1": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.1800,  0.2100 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s1"), s("s1"), s("s1"),       0 ],
		},
		"s2": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.2300,  0.3200 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s2"), s("s2"), s("s2"),       0 ],
		},
		"s3": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.3400,  0.3900 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s3"), s("s3"), s("s3"),       0 ],
		},
		"s4": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.4100,  0.4500 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s4"), s("s4"), s("s4"),       0 ],
		},
		"s5": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.4700,  0.5000 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s5"), s("s5"), s("s5"),       0 ],
		},
		"s6": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.5200,  0.5550 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s6"), s("s6"), s("s6"),       0 ],
		},
		"s7": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.5750,  0.6100 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s7"), s("s7"), s("s7"),       0 ],
		},
		"s8": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.4300,  0.5000 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s8"), s("s8"), s("s8"),       0 ],
		},
		"s9": {
			offset          : [  0.0000,  0.0600,  0.0700,  0.0800,  0.5200,  0.6000 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("s9"), s("s9"), s("s9"),       0 ],
		},
		"s10": {
			offset          : [   0.0000,   0.0600,   0.0700,   0.0800,   0.6200,   0.7200 ],
			opacity         : [        1,        0,        0,        1,        1,        1 ],
			strokeDashoffset: [        0,        0, s("s10"), s("s10"), s("s10"),        0 ],
		},
		"s11": {
			offset          : [   0.0000,   0.0600,   0.0700,   0.0800,   0.6000,   0.6700 ],
			opacity         : [        1,        0,        0,        1,        1,        1 ],
			strokeDashoffset: [        0,        0, s("s11"), s("s11"), s("s11"),        0 ],
		},
		"s12": {
			offset          : [   0.0000,   0.0600,   0.0700,   0.0800,   0.6900,   0.7800 ],
			opacity         : [        1,        0,        0,        1,        1,        1 ],
			strokeDashoffset: [        0,        0, s("s12"), s("s12"), s("s12"),        0 ],
		},
		"s13": {
			offset          : [   0.0000,   0.0600,   0.0700,   0.0800,   0.8000,   0.9100 ],
			opacity         : [        1,        0,        0,        1,        1,        1 ],
			strokeDashoffset: [        0,        0, s("s13"), s("s13"), s("s13"),        0 ],
		},
		"s14": {
			offset          : [   0.0000,   0.0600,   0.0700,   0.0800,   0.9300,   1.0000 ],
			opacity         : [        1,        0,        0,        1,        1,        1 ],
			strokeDashoffset: [        0,        0, s("s14"), s("s14"), s("s14"),        0 ],
		},
	};

	// Trigger animation.
	let animation_i = null;
	ids.forEach((id) => {
		animation_i = path[id].animate(keyframes[id], params);
	});
	animation_i.addEventListener("finish", () => {
		text.is_animating = false;
	});
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#ag").is_animating = false;
	document.querySelector("#xs").is_animating = false;

	document.querySelector("#ag")
		.addEventListener("mouseenter", animate_ag);
	document.querySelector("#xs")
		.addEventListener("mouseenter", animate_xs);
});
