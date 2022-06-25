function create_toast(html, timeout) {
	let toast_box = document.getElementById("toast-box");
	let toast_template = document.getElementById("toast-template");
	
	let toast = toast_template.content.firstElementChild.cloneNode();
	toast.innerHTML = html;
	toast_box.appendChild(toast);
	setTimeout(() => {
		toast.classList.remove("toast-appearing");
		setTimeout(() => {
			toast.classList.add("toast-disappearing");
			setTimeout(() => {
				toast_box.removeChild(toast);
			}, 1600);
		}, timeout);
	}, 280);
}

function copy_battletag() {
	let battletag = document
		.getElementById("connection-battlenet")
		.dataset.battletag;
	navigator.clipboard.writeText(battletag).then(() => {
		create_toast(
			`Copied <pre>${battletag}</pre> to clipboard.`,
			2400
		);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("connection-battlenet")
		.addEventListener("click", copy_battletag);
});
