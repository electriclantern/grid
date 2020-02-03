var s = {
	O: [1, 1, 1,
		1, 0, 1,
		1, 1, 1],
	X: [1, 0, 1,
		0, 1, 0,
		1, 0, 1],
	H: [1, 0, 1,
		1, 1, 1,
		1, 0, 1],
	I: [1, 1, 1,
		0, 1, 0,
		1, 1, 1]
}

function input() {
	if (document.title.toLowerCase() != "oxhi") {

		// GLOBAL COMMANDS
		if (isShape(s.O)) {
			menu('O');
		}

		// MAIN
		if (document.title == "main" || document.title == "welcome.") {
			if (isShape(s.X)) {
				menu('X');
				//let's have an animation that looks like squiggly lines wiggling across the screen
				//to indicate that a transmission is being attempted
			}

			else if (isShape(s.H)) {
				menu('H');
			}

			else if (isShape(s.I)) {
				menu('I')
			}
		}

		// 
	}

	// GAME INTRO
	else if (document.title.toLowerCase() == "oxhi") {
		if (isShape(s.O)) {
			title("O", "o")
		}

		else if (isShape(s.X)) {
			title("X", "x");
		}

		else if (isShape(s.H)) {
			title("H", "h");
		}

		else if (isShape(s.I)) {
			title("I", "i");
		}

		if (document.title == "oxhi") {
			document.title = "welcome.";
			animation_OXHI();
		}
	}
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

function clearGrid() {
	for (let i = 0; i < 9; i++) {
		if (cstate[i]) { cstate[i] = !cstate[i] }
	}
}

function title(a, b) {
	document.title = document.title.replace(a, b);
	clearGrid();
}
function menu(letter) {
	if (letter == 'O') {
		c.selected = 'rgba(255, 207, 48,';
		document.title = "main";
		c.color = c.color_o
	}
	else if (letter == 'H') {
		grid_alpha_value = 0.5;
		document.title = "helix_watch";
		c.color = c.color_h
	}
	else if (letter == 'I') {
		document.title = "systems";
		c.color = c.color_i
	}
	else if (letter == 'X') {
		c.selected = 'rgba(255, 255, 255,';
		say(Dx_transmission_failed);
		document.title = "hq";
		c.color = c.color_x
	}
	clearGrid()
}

var locked = false;
function lock(bool) { //stop user from inputting
	if (bool == true) {
		locked = true;
		canvas.style.cursor = 'auto';
	} else {
		locked = false;
		canvas.style.cursor = 'pointer';
	}
}

//grid animations
function animation_loading() {
	lock(true);

	var time = 0;
	var int = 150;
	var timelimit = 2000;

	//every half a second, a random tile is colored 'c.info'
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

		note_to_artist = [[num], c.info];
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
			clearDialogue('bro');
			say(dialogue_string);
			oxhi_song.play();
			return
		}

		if (time == 500) {
			note_to_artist = [[0, 1, 2, 3, 5, 6, 7, 8], c.info];
		} else if (time == 1000) {
			note_to_artist = [[0, 2, 4, 6, 8], c.info];
		} else if (time == 1500) {
			note_to_artist = [[0, 2, 3, 4, 5, 6, 8], c.info];
		} else if (time == 2000) {
			note_to_artist = [[0, 1, 2, 4, 6, 7, 8], c.info];
		}
	}, int)
}