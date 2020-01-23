function input() {
	if (cstate['1'] && cstate['2'] && cstate['3'] &&
		cstate['4'] && cstate['6'] &&
		cstate['7'] && cstate['8'] && cstate['9']) {
		title.replace("O", "o");
		clear();
	}

	else if (cstate['1'] && cstate['3'] &&
		cstate['5'] &&
		cstate['7'] && cstate['9']) {
		title.replace("X", "x");
		clear();
	}

	else if (cstate['1'] && cstate['3'] &&
		cstate['4'] && cstate['5'] && cstate['6'] &&
		cstate['7'] && cstate['9']) {
		title.replace("H", "h");
		clear();
	}

	else if (cstate['1'] && cstate['2'] && cstate['3'] &&
		cstate['5'] &&
		cstate['7'] && cstate['8'] && cstate['9']) {
		title.replace("I", "i");
		clear();
	}
}

function clear() {
	for (let i = 0; i < 9; i++) {
		if (cstate[i]) { cstate[i] = !cstate[i] }
	}
}