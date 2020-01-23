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
oxhi_song.loop = true;

var o_x_h_i = new Audio("sfx/o_x_h_i.wav");

// everything is way too loud lol
oxhi_song.volume = 0.1;
for (let i = 0; i < 8; i++) {
	tap[i].volume = 0.1;
}
o_x_h_i.volume = 0.1;

function sfx_tap() {
	let num = Math.floor(Math.random()*8);

	if (tap[num].duration > 0 && !tap[num].paused) { //sound is already playing
		//clone sound and play that
		let sound = tap[num].cloneNode();
		sound.volume = 0.1;
		sound.play()
	} else { tap[num].play() }
}

