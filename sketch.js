const modeNormal = "Normal"				// Normal clock
const modeAutoTest = "AutoTest"			// Test all minutes automatically, start at 01:00
const modeManualTest = "ManualTest"		// Test all hours (1-12) and then all 5 minutes intervalls.
const modeEffectTest = "EffectTest"		// Test minute switcher test.

var timeDiplayer;
var t;
const millisecondsPerMinute = 60000;
var mode = modeManualTest;

var settings;

function setup() {
	settings = new Settings();
	createCanvas(400, 400);	
	
	timeDiplayer = new TimeDisplayer(new LanguageTimeObjPlatt);
	frameRate(1);
	
	if (mode != modeNormal) 
		t = new Date(2000, 1, 1, 13, 0);
	if (mode == modeAutoTest || mode == modeManualTest)
		timeDiplayer.minuteSwitchIntervall = 0;
}

function draw() {
	if (mode == modeNormal)
		t = new Date();
	timeDiplayer.displayTime(t);
	
	if (mode == modeAutoTest) {
		// Autotest: Add 1 minute for next draw
		t.setTime(t.getTime() + 1 * millisecondsPerMinute); 	// add 1 minute
	}
	else if (mode == modeManualTest) {
		// Manual test: Add 1h or 5min, draw at mouseclick
		let delta = 5 * millisecondsPerMinute;
		if (t.getHours() != 11 && t.getHours() != 23)
			delta = delta * 12;
		t.setTime(t.getTime() + delta); 
	}

	if (mode == modeEffectTest || mode == modeManualTest)
		noLoop();
}

function mouseClicked() {
	if (mode == modeEffectTest || mode == modeManualTest) draw();
}
