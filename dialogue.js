var dialogue_one = [
	1,
	"whoa . nice job bro",
	"(thats the end of what i made so far :D)"
];

var container = document.getElementById("container");
function say(char, dialogue) {
	if (document.getElementById(char)) { unsay(char) }

	let box = document.createElement("div");
	box.className = "dialogue";
	box.id = char;

	box.className += " interact";

	box.onclick = function() {
		unsay(char)
	}

	if (dialogue[0] <= dialogue.length-1) {
		box.textContent = dialogue[dialogue[0]];
		dialogue[0]++;
		
		if (dialogue[0] == dialogue.length-1) {
			box.onclick = function(){
				say(char, dialogue)
			}
		}
	}

	container.appendChild(box);
}

function unsay(char) {
	let box = document.getElementById(char);
	box.parentNode.removeChild(box);
}