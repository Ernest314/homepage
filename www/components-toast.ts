import { delay } from "./util.js";

export async function create_toast(html: string, timeout: number) {
	const toast_box = document.getElementById("toast-box");
	const toast_template = document.getElementById("toast-template");

	// Check that element fetching was successful.
	if (toast_box === null || toast_template === null ||
		!(toast_box instanceof HTMLDivElement) ||
		!(toast_template instanceof HTMLTemplateElement)
	) {
		throw new Error("Could not initialize toast templates.");
	}
	
	// Attempt to clone a new toast instance.
	const toast = toast_template.content.firstElementChild?.cloneNode(true);
	if (toast === undefined || !(toast instanceof HTMLDivElement)) {
		throw new Error("Could not create new toast.");
	}
	toast.innerHTML = html;

	// Animate toast appearing/disappearing.
	toast_box.appendChild(toast);
	await delay(280);
	toast.classList.remove("toast-appearing");
	await delay(timeout);
	toast.classList.add("toast-disappearing");
	await delay(1600);
	toast_box.removeChild(toast);
}
