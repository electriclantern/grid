function input() {
	if (cstate[0] && cstate[1] && cstate[2] &&
		cstate[3] && cstate[5] &&
		cstate[6] && cstate[7] && cstate[8]) {
		title("O", "o");
	}

	else if (cstate[0] && cstate[2] &&
		cstate[4] &&
		cstate[6] && cstate[8]) {
		title("X", "x");
	}

	else if (cstate[0] && cstate[2] &&
		cstate[3] && cstate[4] && cstate[5] &&
		cstate[6] && cstate[8]) {
		title("H", "h");
	}

	else if (cstate[0] && cstate[1] && cstate[2] &&
		cstate[4] &&
		cstate[6] && cstate[7] && cstate[8]) {
		title("I", "i");
	}
}

function clear() {
	for (let i = 0; i < 9; i++) {
		if (cstate[i]) { cstate[i] = !cstate[i] }
	}
}

function title(a, b) {
	document.title = document.title.replace(a, b);
	clear();
}