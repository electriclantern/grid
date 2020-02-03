var time_setting = 500; //ms per word
var default_time = 500; //every message will stay up for at least this amount of ms

var Dx_transmission_failed = `
system: Transmitting error messages.
system: Transmitting error messages..
system: Transmitting error messages...
system: Transmission failed.
`;

var dialogue_string = `
bro: whoa . nice job bro / me: (thats the end of what i made so far :D)
`;

// mini dialogue tutorial
// bro: hi / me: hi 		-> bro and i talk at the same time
// bro: hi /. me: hi 		-> i talk a moment after bro talks
// bro: hi 					-> bro talks
// /. 						-> breaks, no messages on screen
//							unlimited breakss, unlimited immediate messages

function parseDialogue(string) { //turn readable dialogue string into usable array
	let array = string.split(/\r?\n|\r/g);
	array[0] = 1;
	array.pop();

	for (let i = 1; i < array.length; i++) {
		array[i] = array[i].split(": ");
		if (array[i][0].indexOf("/.") > -1) {
			array[i][0] = array[i][0].length-1;
		} else {
			for (let v = 0; v < array[i].length; v++) {
				if (array[i][v].indexOf(" / ") > -1) {
					array[i][v] = array[i][v].split(" / ");
					array[i][v].splice(1, 0, 0);
					array[i] = [].concat.apply([], array[i]); //flatten array
					v++;

				} else if (array[i][v].indexOf(" /.") > -1) {
					let hde = array[i][v]; //hde : "i'm bro /.. ellie"
					hde = hde.split(" /"); //hde : ["i'm bro", ".. ellie"]
					hde[1] = hde[1].split(" "); //hde : ["i'm bro", ["..", "ellie"]]
					hde[1][0] = hde[1][0].length; //hde : ["i'm bro", [2, "ellie"]]
					array[i][v] = [hde[0], ...hde[1]];
					array[i] = [].concat.apply([], array[i]); //flatten array
					v++;
				}
			}
		}
	}

	return array
}

var container = document.getElementById("container");

function say(dialogue) {
	if (typeof dialogue == "string") {
		dialogue = parseDialogue(dialogue)
	} else {
		dialogue[0] = 0
	}

	speak(dialogue);
}

function speak(array) {
	if (array[0] >= array.length) { return }

	let line = array[array[0]]; //line: ["bro", "hi", 0, "ellie", "Hi!"]
	let breaks = 0;

	array[0]++;

	if (line.length > 1) {
		for (let i = 0; i < line.length; i++) { //check for breaks
			if (!isNaN(line[i])) {
				breaks++;
			}
		}

		if (breaks > 0) { //multiple dialogue line
			let longest_time = 0;
			let longest = 0;
			for (let i = 0; i < line.length; i += 3) { //check which dialogue is last to go
				let linetime = (line[i+1].split(" ").length * time_setting) + default_time;
				if (i>0) { linetime += line[i-1] }

				if (linetime > longest_time) {
					longest = i;
					longest_time = linetime
				}
			}

			for (let i = 0; i <= line.length; i += 3) { //print dialogue w/ breaks
				if (longest != i) {
					var istrig = false;
				} else {
					var istrig = true;
				}

				if (i>0) {
					if (line[i-1] > 0) { // breaks before sending message
						setTimeout(function() {
							printDialogue(line[i], line[i+1], array, istrig);
						}, line[i-1]*time_setting)
					} else if (line[i-1] == 0) {
						printDialogue(line[i], line[i+1], array, istrig);
					}
				} else {
					printDialogue(line[i], line[i+1], array, istrig);
				}
			}
		} else { //single dialogue line
			printDialogue(line[0], line[1], array, true);
		}
	} else { // line is a break
		setTimeout(function() {
			speak(array)
		}, line[0]*time_setting)
	}
}

function printDialogue(char, dialogue, array, istrigger) {
	let box = document.createElement("div");
	box.className = "dialogue";
	box.id = char;

	time = (dialogue.split(" ").length * time_setting) + default_time;

	box.textContent = dialogue;
		
	if (istrigger) {
		setTimeout(function() {
			clearDialogue(char);
			speak(array);
		}, time)
	} else {
		setTimeout(function() { //suicide
			clearDialogue(char)
		}, time)
	}

	container.appendChild(box);
}

function clearDialogue(char) {
	if (char) {
		if (document.getElementById(char)) {
			let self = document.getElementById(char);
			self.parentNode.removeChild(self);
		}
	} else {
		let D = document.getElementsByClassName('dialogue');

		while (D[0]) {
			D[0].parentNode.removeChild(D[0])
		}
	}
}