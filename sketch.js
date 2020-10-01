const modeNormal = "Normal"				// Normal clock
const modeAutoTest = "AutoTest"			// Test all minutes automatically, start at 01:00
const modeManualTest = "ManualTest"		// Test all hours (1-12) and then all 5 minutes intervalls.
const modeEffectTest = "EffectTest"		// Test minute switcher test.
const defaultMode = modeManualTest;
const millisecondsPerMinute = 60000;

var timeDiplayer;
var t;
var mode = defaultMode;
var hint = "";

var settings;

function setup() {
	settings = new Settings();
	createCanvas(600, 600);	
	
	timeDiplayer = new TimeDisplayer(new LanguageTimeObjPlatt);
	frameRate(1);
	
	setMode(defaultMode);
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

	// Hint to toggle
	textAlign(CENTER, TOP);
	textSize(9);
	fill(0);
	text(hint, width/2, 2);
}

function mouseClicked() {
	if (mode == modeEffectTest || mode == modeManualTest) draw();
}

function keyPressed() {
	if (mode == modeManualTest)
		setMode(modeNormal)
    else if (mode == modeNormal)
		setMode(modeManualTest);
}

function setMode(_mode)
{
	mode = _mode
	
	if (mode == modeManualTest) {
		hint = "press any key to switch to clock mode." + char(10) + "Click to display next time.";
		t = new Date(2000, 1, 1, 13, 0);
		// Don't set m
	}
    else if (mode == modeNormal) {	
		hint = "press any key to switch to debug mode";
		loop();
    }
	
	if (mode == modeEffectTest || mode == modeManualTest)
		noLoop();
	
	if (mode == modeAutoTest || mode == modeManualTest)
		timeDiplayer.minuteSwitchIntervall = 0;
	
	draw();
}