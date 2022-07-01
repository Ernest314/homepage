import { create_toast } from "./components-toast.js";

// Add a "secrets" property to the document (as a global).
declare global { interface Document {
	secrets: { [key: string]: Secret };
} }
interface Secret {
	key: string;
	attempt: KeyboardEvent[];
}

function register_secret(key: string, response: string) {
	// Initialize the reference target (goal) value, and an array to
	// hold the current matching attempts.
	document.secrets[key] = {
		key: key,
		attempt: [],
	};

	// Matching on "keyup" bypasses having to deal with repeat keys
	// from holding a key down.
	document.addEventListener("keyup", event => {
		// Push the event to the attempt array, to be checked against.
		document.secrets[key].attempt.push(event);

		let i = document.secrets[key].attempt.length - 1;
		let key_i = document.secrets[key].key[i];

		// If the entire string matches the attempt array, create a
		// toast (and reset the attempt array).
		if (event.key == key_i) {
			if (i == document.secrets[key].key.length - 1) {
				create_toast(response, 4800);
				document.secrets[key].attempt = [];
			}
			return;
		}

		// Ignore non-character keypresses.
		if (event.key.length != 1) {
			document.secrets[key].attempt.pop();
			return;
		}
		
		// If a character keypress doesn't match, reset the attempt
		// array (start over), or treat the keypress as the first
		// keypress if it matches the first reference character.
		if (event.key == document.secrets[key].key[0]) {
			document.secrets[key].attempt = [ event ];
		} else {
			document.secrets[key].attempt = [];
		}
	});
}

function register_all_secrets() {
	const secrets = [
		{ k: "A&&E", v: "&#127769; I love you so much, my lily &#127799;" },
		{ k: "A+E", v: "Ambi and Erny, sitting in a tree &#127795; K-I-S-S-I-N-G" },
		{ k: "you are my sunshine", v: "&#9728; my only sunshine, you make me happy, when skies are gray &#9729;" },
		{ k: "07-23", v: "&#128156; be mine &#128140; forever &#128154;" },
		{ k: "I love you", v: "I love you &#128149; &#128149; &#128149;" },
		{ k: "princess syndrome", v: "说一千遍爱你 &#128152; 这都不是问题" },
		{ k: "chicken tendies", v: "&#127744;&#128068;&#127744;" },
		{ k: "breakfast soup", v: "&#9749;&#127749;" },
	];
	for (const secret of secrets) {
		register_secret(secret.k, secret.v);
	}
}

// Make sure the secrets property is initialized.
document.secrets = document.secrets || [];
register_all_secrets();
