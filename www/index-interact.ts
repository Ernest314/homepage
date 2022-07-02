import { create_toast } from "./components-toast.js";

export function copy_battletag() {
	let battletag = document
		.getElementById("connection-battlenet")
		?.dataset.battletag;
	if (battletag === undefined) {
		throw new Error("");
	}

	navigator.clipboard.writeText(battletag).then(() => {
		create_toast(
			`Copied <pre>${battletag}</pre> to clipboard.`,
			2400
		);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const element_battlenet =
		document.getElementById("connection-battlenet");
	if (element_battlenet === null) {
		throw new Error("Could not initialize Battle.net button.");
	}

	element_battlenet.addEventListener("click", copy_battletag);
});
