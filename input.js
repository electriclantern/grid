var s = {
	o: [1, 1, 1,
		1, 0, 1,
		1, 1, 1],
	x: [1, 0, 1,
		0, 1, 0,
		1, 0, 1],
	h: [1, 0, 1,
		1, 1, 1,
		1, 0, 1],
	i: [1, 1, 1,
		0, 1, 0,
		1, 1, 1]
}

function isShape(shape) {
	let parsed = true;

	for (let i = 0; i < 9; i++) {
		if ((cstate[i] == false && shape[i] == 1) ||
			(cstate[i] == true && shape[i] == false)) {
			parsed = false
		}
	}

	return parsed;
}

function input() {
	if (document.title.toLowerCase() == "oxhi") {
		if (isShape(s.o)) {
			title("O", "o")
		}

		else if (isShape(s.x)) {
			title("X", "x");
		}

		else if (isShape(s.h)) {
			title("H", "h");
		}

		else if (isShape(s.i)) {
			title("I", "i");
		}

		if (document.title == "oxhi") {
			document.title = "welcome.";
			animation_OXHI();
		}
	}

	if (document.title.toLowerCase() == "welcome.") {

	}
}

function title(a, b) {
	document.title = document.title.replace(a, b);
	clear();
}

function clear() {
	for (let i = 0; i < 9; i++) {
		if (cstate[i]) { cstate[i] = !cstate[i] }
	}
}

function animation_loading() {
	lock(true);

	var time = 0;
	var int = 150;
	var timelimit = 2000;

	//every half a second, a random tile is colored 'c.loading'
	var prevnum = 0;
	var num = 0;
	var animation = setInterval(function() {
		time += int;

		prevnum = num;
		while (num == prevnum) {
			num = Math.floor(Math.random()*9);
		}

		if (time > timelimit) {
			note_to_artist = false;
			lock(false);
			clearInterval(animation);
			return
		}

		note_to_artist = [[num], c.loading];
	}, int)
}

function animation_OXHI() {
	o_x_h_i.play();
	lock(true);
	bro.textContent = "";

	var time = 0;
	var int = 500;
	var timelimit = 2500;

	var animation = setInterval(function() {
		time += int;

		if (time > timelimit) {
			note_to_artist = false;
			lock(false);
			clearInterval(animation);

			//OXHI UNLOCKED
			say(dialogue_string);
			oxhi_song.play();
			return
		}

		if (time == 500) {
			note_to_artist = [[0, 1, 2, 3, 5, 6, 7, 8], c.loading];
		} else if (time == 1000) {
			note_to_artist = [[0, 2, 4, 6, 8], c.loading];
		} else if (time == 1500) {
			note_to_artist = [[0, 2, 3, 4, 5, 6, 8], c.loading];
		} else if (time == 2000) {
			note_to_artist = [[0, 1, 2, 4, 6, 7, 8], c.loading];
		}
	}, int)
}

var locked = false;
function lock(bool) {
	if (bool == true) {
		locked = true;
		canvas.style.cursor = 'auto';
	} else {
		locked = false;
		canvas.style.cursor = 'pointer';
	}
}