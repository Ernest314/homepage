function toggle_signature() {
	let signature_en = document.getElementById("signature-en");
	let signature_zh = document.getElementById("signature-zh");
	signature_en.classList.toggle("hidden");
	signature_zh.classList.toggle("hidden");
	if (!signature_en.classList.contains("hidden")) {
		animate_signature_en(false);
	}
	if (!signature_zh.classList.contains("hidden")) {
		animate_signature_zh(false);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#signature-en")
		.addEventListener("click", toggle_signature);
	document.querySelector("#signature-zh")
		.addEventListener("click", toggle_signature);
});
