function input() {
	if (cstate[0] && cstate[1] && cstate[2] &&
		cstate[3] && !cstate[4] && cstate[5] &&
		cstate[6] && cstate[7] && cstate[8]) {
		title("O", "o");
	}

	else if (cstate[0] && !cstate[1] && cstate[2] &&
		!cstate[3] && cstate[4] && !cstate[5] &&
		cstate[6] && cstate[8] && !cstate[9]) {
		title("X", "x");
	}

	else if (cstate[0] && !cstate[1] && cstate[2] &&
		cstate[3] && cstate[4] && cstate[5] &&
		cstate[6] && !cstate[7] && cstate[8]) {
		title("H", "h");
	}

	else if (cstate[0] && cstate[1] && cstate[2] &&
		!cstate[3] && cstate[4] && !cstate[5] &&
		cstate[6] && cstate[7] && cstate[8]) {
		title("I", "i");
	}

	if (title == "oxhi") {
		title = "welcome.";
		animation_loading();
	}
}

function clear() {
	for (let i = 0; i < 9; i++) {
		if (cstate[i]) { cstate[i] = !cstate[i] }
	}
}

function title(a, b) {
	title = title.replace(a, b);
	clear();
}

var locked = false;
function animation_loading() {
	locked = true;

	//for three seconds, play this loading animation
	var time = 0;
	var int = 500;
	var timelimit = 3000;

	//every half a second, a random tile is colored 'c.loading'
	var prevnum = 0;
	var num = 0;
	var animation = setInterval(function() {
		time += 500;

		drawTile(num, c.color);
		prevnum = num;
		while (num == prevnum) {
			num = Math.floor(Math.random()*9);
		}
		drawTile(num, c.loading);

		if (time == timelimit) {
			drawTile(num, c.color);
			locked = false;
			clearInterval(animation);
		}
	}, int)
}