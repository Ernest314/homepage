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

window.addEventListener("load", function() {
	document.querySelector("#signature-en")
		.addEventListener("mouseenter", animate_signature_en);
});
