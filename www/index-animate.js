function animate_signature_en() {
	var path = {
		"e": document.getElementById("signature-e"),
		"g": document.getElementById("signature-g"),
		".": document.getElementById("signature-dot"),
	};
	var length = {};
	
	var animations = path["."].getAnimations();
	if (animations.length > 0 && animations[0].playState == "running") {
		return;
	}

	function init_data(key) {
		length[key] = path[key].getTotalLength();
		path[key].style.strokeDasharray = length[key];
	}
	init_data("e");
	init_data("g");
	init_data(".");

	var duration = 1400; // msec
	function s(id) { return length[id]; }
	var keyframes = {
		"e": {
			offset          : [ 0.0000, 0.0800, 0.0900, 0.1000, 0.2000, 0.4500 ],
			opacity         : [      1,      0,      0,      1,      1,      1 ],
			strokeDashoffset: [      0,      0, s("e"), s("e"), s("e"),      0 ],
		},
		"g": {
			offset          : [ 0.0000, 0.0800, 0.0900, 0.1000, 0.3500, 0.8000 ],
			opacity         : [      1,      0,      0,      1,      1,      1 ],
			strokeDashoffset: [      0,      0, s("g"), s("g"), s("g"),      0 ],
		},
		".": {
			offset          : [ 0.0000, 0.0800, 0.0900, 0.1000, 0.9000, 1.0000 ],
			opacity         : [      1,      0,      0,      1,      1,      1 ],
			strokeDashoffset: [      0,      0, s("."), s("."), s("."),      0 ],
		},
	};

	path["e"].animate(keyframes["e"], duration);
	path["g"].animate(keyframes["g"], duration);
	path["."].animate(keyframes["."], duration);
}

function animate_signature_zh() {
	var path = {
		"x1": document.getElementById("signature-x-1"),
		"x2": document.getElementById("signature-x-2"),
		"x3": document.getElementById("signature-x-3"),
		"x4": document.getElementById("signature-x-4"),
		"z1": document.getElementById("signature-z-1"),
		"z2": document.getElementById("signature-z-2"),
		"z3": document.getElementById("signature-z-3"),
		"z4": document.getElementById("signature-z-4"),
	};
	var length = {};
	
	var animations = path["z4"].getAnimations();
	if (animations.length > 0 && animations[0].playState == "running") {
		return;
	}

	function init_data(key) {
		length[key] = path[key].getTotalLength();
		path[key].style.strokeDasharray = length[key];
	}
	init_data("x1");
	init_data("x2");
	init_data("x3");
	init_data("x4");
	init_data("z1");
	init_data("z2");
	init_data("z3");
	init_data("z4");

	var duration = 3000; // msec
	function s(id) { return length[id]; }
	var keyframes = {
		"x1": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.1000,  0.2100 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x1"), s("x1"), s("x1"),       0 ],
		},
		"x2": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.2600,  0.3100 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x2"), s("x2"), s("x2"),       0 ],
		},
		"x3": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.3800,  0.4500 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x3"), s("x3"), s("x3"),       0 ],
		},
		"x4": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.5000,  0.5800 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("x4"), s("x4"), s("x4"),       0 ],
		},
		"z1": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.4800,  0.5700 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z1"), s("z1"), s("z1"),       0 ],
		},
		"z2": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.6200,  0.6900 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z2"), s("z2"), s("z2"),       0 ],
		},
		"z3": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.7600,  0.8700 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z3"), s("z3"), s("z3"),       0 ],
		},
		"z4": {
			offset          : [  0.0000,  0.0400,  0.0500,  0.0600,  0.9200,  1.0000 ],
			opacity         : [       1,       0,       0,       1,       1,       1 ],
			strokeDashoffset: [       0,       0, s("z4"), s("z4"), s("z4"),       0 ],
		},
	};

	path["x1"].animate(keyframes["x1"], duration);
	path["x2"].animate(keyframes["x2"], duration);
	path["x3"].animate(keyframes["x3"], duration);
	path["x4"].animate(keyframes["x4"], duration);
	path["z1"].animate(keyframes["z1"], duration);
	path["z2"].animate(keyframes["z2"], duration);
	path["z3"].animate(keyframes["z3"], duration);
	path["z4"].animate(keyframes["z4"], duration);
}

window.addEventListener("load", function() {
	document.querySelector("#signature-en")
		.addEventListener("mouseenter", animate_signature_en);
	document.querySelector("#signature-zh")
		.addEventListener("mouseenter", animate_signature_zh);
});
