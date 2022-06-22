function animate_signature_en() {
	var path = {
		"e": document.getElementById("signature-e"),
		"g": document.getElementById("signature-g"),
		".": document.getElementById("signature-dot"),
	};
	var length = {};

	function init_data(key) {
		length[key] = path[key].getTotalLength();
		path[key].style.strokeDasharray = length[key];
	}
	init_data("e");
	init_data("g");
	init_data(".");

	var duration = 1400; // msec
	var keyframes = {
		"e": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.08, opacity: 0 },
			{ offset: 0.08, strokeDashoffset: 0 },
			{ offset: 0.09, opacity: 0 },
			{ offset: 0.09, strokeDashoffset: length["e"] },
			{ offset: 0.10, opacity: 1 },
			{ offset: 0.20, strokeDashoffset: length["e"] },
			{ offset: 0.45, strokeDashoffset: 0 },
		],
		"g": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.08, opacity: 0 },
			{ offset: 0.08, strokeDashoffset: 0 },
			{ offset: 0.09, opacity: 0 },
			{ offset: 0.09, strokeDashoffset: length["g"] },
			{ offset: 0.10, opacity: 1 },
			{ offset: 0.35, strokeDashoffset: length["g"] },
			{ offset: 0.80, strokeDashoffset: 0 },
		],
		".": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.08, opacity: 0 },
			{ offset: 0.08, strokeDashoffset: 0 },
			{ offset: 0.09, opacity: 0 },
			{ offset: 0.09, strokeDashoffset: length["."] },
			{ offset: 0.10, opacity: 1 },
			{ offset: 0.90, strokeDashoffset: length["."] },
			{ offset: 1.00, strokeDashoffset: 0 },
		],
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

	var duration = 3200; // msec
	var keyframes = {
		"x1": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["x1"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.10, strokeDashoffset: length["x1"] },
			{ offset: 0.21, strokeDashoffset: 0 },
		],
		"x2": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["x2"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.26, strokeDashoffset: length["x2"] },
			{ offset: 0.31, strokeDashoffset: 0 },
		],
		"x3": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["x3"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.38, strokeDashoffset: length["x3"] },
			{ offset: 0.45, strokeDashoffset: 0 },
		],
		"x4": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["x4"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.50, strokeDashoffset: length["x4"] },
			{ offset: 0.58, strokeDashoffset: 0 },
		],
		"z1": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["z1"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.48, strokeDashoffset: length["z1"] },
			{ offset: 0.57, strokeDashoffset: 0 },
		],
		"z2": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["z2"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.62, strokeDashoffset: length["z2"] },
			{ offset: 0.69, strokeDashoffset: 0 },
		],
		"z3": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["z3"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.76, strokeDashoffset: length["z3"] },
			{ offset: 0.87, strokeDashoffset: 0 },
		],
		"z4": [
			{ offset:    0, opacity: 1 },
			{ offset: 0.04, opacity: 0 },
			{ offset: 0.04, strokeDashoffset: 0 },
			{ offset: 0.05, opacity: 0 },
			{ offset: 0.05, strokeDashoffset: length["z4"] },
			{ offset: 0.06, opacity: 1 },
			{ offset: 0.92, strokeDashoffset: length["z4"] },
			{ offset: 1.00, strokeDashoffset: 0 },
		],
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
