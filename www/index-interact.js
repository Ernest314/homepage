function toggle_signature() {
	let signature_en = document.getElementById("signature-en");
	let signature_zh = document.getElementById("signature-zh");
	signature_en.classList.toggle("hidden");
	signature_zh.classList.toggle("hidden");
	
	function get_animation(id) {
		let element = document.getElementById(id);
		let list = element.getAnimations();
		if (list.length > 0) {
			return list[0];
		}
		return null;
	}

	function set_animation_time(id, msec) {
		console.info(id);
		console.info(msec);
		let animation = get_animation(id);
		if (animation == null) {
			return;
		}
		animation.currentTime = msec;
		animation.pause();
	}

	// let animations = [].concat(
	// 	get_animation("signature-e"),
	// 	get_animation("signature-g"),
	// 	get_animation("signature-dot"),
	// 	get_animation("signature-x-1"),
	// 	get_animation("signature-x-2"),
	// 	get_animation("signature-x-3"),
	// 	get_animation("signature-x-4"),
	// 	get_animation("signature-z-1"),
	// 	get_animation("signature-z-2"),
	// 	get_animation("signature-z-3"),
	// 	get_animation("signature-z-4")
	// );

	// animations.forEach((animation, index) => {
	// 	console.info(animation);
	// 	console.info(index);
	// 	animation.pause();
	// });

	// set_animation_time("signature-e",   700);
	// set_animation_time("signature-g",   140);
	// set_animation_time("signature-dot", 140);
	// set_animation_time("signature-x-1", 180);
	// set_animation_time("signature-x-2", 180);
	// set_animation_time("signature-x-3", 180);
	// set_animation_time("signature-x-4", 180);
	// set_animation_time("signature-z-1", 180);
	// set_animation_time("signature-z-2", 180);
	// set_animation_time("signature-z-3", 180);
	// set_animation_time("signature-z-4", 180);
}

window.addEventListener("load", function() {
	document.querySelector("#signature-en")
		.addEventListener("click", toggle_signature);
	document.querySelector("#signature-zh")
		.addEventListener("click", toggle_signature);
});
