function copy_battletag() {
	let toast_box = document.getElementById("toast-box");
	let toast_template = document.getElementById("toast-template");

	let battletag = document.getElementById("connection-battlenet")
		.dataset.battletag;
	navigator.clipboard.writeText(battletag).then(() => {
		let toast = toast_template.content.firstElementChild.cloneNode();
		toast.innerHTML = `Copied <pre>${battletag}</pre> to clipboard.`;
		toast_box.appendChild(toast);
		setTimeout(() => {
			toast.classList.remove("toast-appearing");
			setTimeout(() => {
				toast.classList.add("toast-disappearing");
				setTimeout(() => {
					toast_box.removeChild(toast);
				}, 1600);
			}, 2400);
		}, 280);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("connection-battlenet")
		.addEventListener("click", copy_battletag);
});
