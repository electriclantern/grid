var tap = [
		new Audio("sfx/tap1.wav"),
		new Audio("sfx/tap2.wav"),
		new Audio("sfx/tap3.wav"),
		new Audio("sfx/tap4.wav"),
		new Audio("sfx/tap5.wav"),
		new Audio("sfx/tap6.wav"),
		new Audio("sfx/tap7.wav"),
		new Audio("sfx/tap8.wav")
	];

var oxhi_song = new Audio("sfx/iwokeupinthemiddleofthenighttowritedownthismelody.wav");

function sfx_tap() {
	let num = Math.floor(Math.random()*8);
	tap[num].play();
}