var gametime = {hr: 0, min: 0, day: 0, time: 0};
var clock_interval = setInterval( function() {
	let hr;
	let min;

	gametime.min += 1;
	gametime.time += 1;

	if (gametime.min < 10) {
		min = "0" + gametime.min
	} else if (gametime.min < 60) {
		min = gametime.min
	} else {
		gametime.min -= 60;
		gametime.hr++;
		min = "0" + gametime.min
	}

	if (gametime.hr < 10) {
		hr = "0" + gametime.hr
	} else if (gametime.hr < 24) {
		hr = gametime.hr
	} else {
		gametime.hr -= 24;
		gametime.day++;
		hr = "0" + gametime.hr
	}

	clock.textContent = hr + ":" + min;

	for (let i = 0; i < helix.length; i++) {
		let h = helix[i];

		if (h.next_galaxy > 0) {
			//helix is moving or is waiting to move
			if ((h.speed > 0) || (h.internal_clock < h.traveltime + h.stoptime)) {
				h.internal_clock++;
			} else { //get helix moving to next galaxy
				h.internal_clock = 0;
				h.galaxy = h.next_galaxy;
				if (!h.priority) {
					if (h.next_galaxy < 7) {
						h.next_galaxy++;
					} else {
						h.next_galaxy == 0;
					}
				} else { h.next_galaxy == -1 }
			}
		}
	}

	// write all information onto ui
	for (let i = 0; i < helix.length; i++) {
		let h = helix[i];
		let ui = document.getElementById(h.id);
		let next_stop;

		if (h.next_galaxy < 0) {
			next_stop = "n/a"
		} else {
			next_stop = "<span class='galaxy'>" + galaxy[h.menu_galaxy].name + "</span>";
		}

		let stop = "<span class='galaxy'>" + galaxy[h.galaxy].name + "</span>";

		ui.innerHTML =
			h.id + "<br />" +
			"TYPE: ";
		if (h.priority) { ui.innerHTML += "priority " }
		ui.innerHTML += h.type + " helix <br />" +
			"CURRENT GALAXY: " + stop + "<br />" +
			"NEXT STOP: " + next_stop + "<br />" +
			"STOP LENGTH: " + h.stoptime + "min <br />" +
			"STATUS: ";
		if (h.speed > 0) {
			ui.innerHTML += "moving"
		} else {
			ui.innerHTML += "stopped"
		}
	}

	let menu_galaxies = document.getElementsByClassName('galaxy');
	for (let i = 0; i < menu_galaxies.length; i++) {
		let g = menu_galaxies[i].textContent;

		for (let ii = 0; ii < galaxy.length; ii++) {
			if (g == galaxy[ii].name) {
				g = ii;
			}
		}

		menu_galaxies[i].addEventListener("click", function(e) {
			menu_galaxy(g);
			e.stopPropagation();
		})
	}
}, 1000);

var galaxy = [
	{ //0
		name: "waxy & withy"
	},
	{ //1
		name: "vita"
	},
	{ //2
		name: "moya"
	},
	{ //3
		name: "haymow"
	},
	{ //4
		name: "outway"
	},
	{ //5
		name: "tahou"
	},
	{ //6
		name: "muth"
	},
	{ //7
		name: "aio"
	}
];

var helix = [
	{ //0
		id: "h380-p0",
		priority: true,
		type: 'passenger',
		galaxy: 0,
		next_galaxy: -1, //no destination; will not loop
		internal_clock: 0,
		stoptime: 1, //time stopped at each galaxy
		traveltime: 10, //time needed to travel to different galaxy
		speed: 0 //stopped
	},
	{ //1
		id: "h380-p1",
		priority: true,
		type: 'passenger',
		galaxy: 1,
		next_galaxy: -1,
		internal_clock: 0,
		stoptime: 1,
		traveltime: 10,
		speed: 0 //stopped
	},
	{ //2
		id: "h380-p2",
		priority: true,
		type: 'passenger',
		galaxy: 2,
		next_galaxy: -1,
		internal_clock: 0,
		stoptime: 1,
		traveltime: 10,
		speed: 0 //stopped
	},
	{ //3
		id: "h360-0",
		priority: false,
		type: 'passenger',
		galaxy: 3,
		next_galaxy: -1,
		internal_clock: 0,
		stoptime: 1,
		traveltime: 10,
		speed: 0 //stopped
	},
	{ //4
		id: "h360-1",
		priority: false,
		type: 'passenger',
		galaxy: 4,
		next_galaxy: -1,
		internal_clock: 0,
		stoptime: 1,
		traveltime: 10,
		speed: 0 //stopped
	},
	{ //5
		id: "h290-0",
		priority: false,
		type: 'cargo',
		galaxy: 0,
		next_galaxy: -1,
		internal_clock: 0,
		stoptime: 15,
		traveltime: 10,
		speed: 0 //stopped
	},
	{ //6
		id: "h290-1",
		priority: false,
		type: 'cargo',
		galaxy: 1,
		next_galaxy: -1,
		internal_clock: 0,
		stoptime: 15,
		traveltime: 10,
		speed: 0 //stopped
	},
	{ //7
		id: "h290-2",
		priority: false,
		type: 'cargo',
		galaxy: 2,
		next_galaxy: -1,
		internal_clock: 0,
		stoptime: 15,
		traveltime: 10,
		speed: 0 //stopped
	}
];