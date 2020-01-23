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

	if (document.title == "oxhi") {
		document.title = "welcome.";
		animation_OXHI();
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
	lock(true);
	bro.textContent = "";
	o_x_h_i.play();

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
			bro.textContent = "haha . nice job bro";
			bro.className = 'interact';
			bro.onclick = dialogue;
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

var dl = 0;
var dialog = [
	"thanks for freeing me bro . i've been stuck to this thing forever",
	"now this weird beeping thing is yours . (unless you close the tab but that wouldn't be in the spirit of the game)",
	"i can finally go home . . .",
	""
];
function dialogue() {
	bro.textContent = dialog[dl];

	if (dialog[dl] != "") {
		dl++
	} else { bro.className = "" }
}