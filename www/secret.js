function register_secret(key, reference, response) {
	if (typeof document.secret === "undefined") {
		document.secret = {};
	}

	document.secret[key] = {
		reference: Array.from(reference),
		attempt: [],
	};

	document.addEventListener("keyup", event => {
		document.secret[key].attempt.push(event);

		let i = document.secret[key].attempt.length - 1;
		let key_i = document.secret[key].reference[i];

		if (event.key == key_i) {
			if (i == document.secret[key].reference.length - 1) {
				create_toast(response, 4800);
				document.secret[key].attempt = [];
			}
			return;
		}

		if (event.key.length == 1) {
			if (event.key == document.secret[key].reference[0]) {
				document.secret[key].attempt = [ event ];
			} else {
				document.secret[key].attempt = [];
			}
		} else {
			document.secret[key].attempt.pop();
		}
	});
}

register_secret(
	"A&E", "A&&E",
	"&#127769; I love you so much, my lily &#127799;"
);
register_secret(
	"A+E", "A+E",
	"Ambi and Erny, sitting in a tree &#127795; K-I-S-S-I-N-G"
);
register_secret(
	"sunshine", "you are my sunshine",
	"&#9728; my only sunshine, you make me happy, when skies are gray &#9729;"
);
register_secret(
	"0723", "07-23",
	"&#128156; be mine &#128140; forever &#128154;"
);
register_secret(
	"ilu", "I love you",
	"I love you &#128149; &#128149; &#128149;"
);
register_secret(
	"princess", "princess syndrome",
	"说一千遍爱你 &#128152; 这都不是问题"
);
register_secret(
	"tendies", "chicken tendies",
	"&#127744;&#128068;&#127744;"
);
