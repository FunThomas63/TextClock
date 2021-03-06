const modeNormal = "Normal"				// Normal clock
const modeAutoTest = "AutoTest"			// Test all minutes automatically, start at 01:00
const modeManualTest = "ManualTest"		// Test all hours (1-12) and then all 5 minutes intervalls.
const modeEffectTest = "EffectTest"		// Test minute switcher test.
const defaultMode = modeManualTest;
const millisecondsPerMinute = 60000;
const defaultSize = 600;

var timeDiplayer;
var t;
var mousePressedEventStart;				// Remember the time when mouse was pressed (to check if it was hold for 1s)
var mouseReleasedEvent;					// Remember when the mouse was released (to check for doubleClick)
var mode = defaultMode;
var hint = "";
var isFullScreen = false;

var eventLog = [];

var settings;

function setup() {
	noLoop();
	settings = new Settings();
	createCanvas(defaultSize, defaultSize);	
	
	timeDiplayer = new TimeDisplayer(new LanguageTimeObjPlatt);
	frameRate(1);
	
	setMode(defaultMode);
}

// --------------------------------------------------------------------
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
	
	showEvents();
}

// --------------------------------------------------------------------

function mousePressed() {
eventLog.push("Mouse Pressed");
showEvents();
    
	mousePressedEventStart = new Date();
}

function mouseReleased() {
eventLog.push("Mouse Released");
showEvents();
    
	let now = new Date();
	
    if (now - mouseReleasedEvent < 200)
		toggleFullscreen();
	else if (new Date() - mousePressedEventStart > 1000) 
		toggleMode();

	mouseReleasedEvent = now;	
}

function mouseClicked() {
	eventLog.push("Mouse Clicked");
	showEvents();
	
	if (mode == modeEffectTest || mode == modeManualTest) draw();
}

function toggleFullscreen() {
	isFullScreen = !isFullScreen;

	if (isFullScreen) {
		if (!fullscreen()) fullscreen(true);
		resizeCanvas(windowWidth, windowHeight);
	}
	else {
		if (fullscreen()) fullscreen(false);
		resizeCanvas(defaultSize, defaultSize);
	}
		
	timeDiplayer.setSize();
	draw();
}

function windowResized() {
	if (isFullScreen) {
		resizeCanvas(windowWidth, windowHeight);
		timeDiplayer.setSize();
		draw();
	}
}

function keyPressed() {
eventLog.push("Key Pressed");
showEvents();

	toggleMode();
}



/*
function touchStarted() {
eventLog.push("Touch started");
showEvents();
	mousePressedEventStart = new Date();
}

function touchEnded() {
eventLog.push("Touch ended");
showEvents();
	if (new Date() - mousePressedEventStart > 1000) 
		toggleMode();
}
*/

function showEvents() {
	textSize(9);
	textAlign(LEFT, TOP);
	for (let i=0; i<eventLog.length; i++)
		text(eventLog[i], 4, 10+i*10);
}



function toggleMode() {
	// Toggle between Debug and Normal mode 
	if (mode == modeManualTest)
		setMode(modeNormal)
    else if (mode == modeNormal)
		setMode(modeManualTest);
}

function setMode(_mode)
{
	mode = _mode
	
	switch (mode) {

		case modeNormal:
			hint = "press any key or hold mouse for 1 second to switch to debug mode";
			settings.minuteSwitchIntervall = 1;
			loop();
			break;

		case modeManualTest:
			hint = "press any key or hold mouse for 1 second to switch to clock mode." + char(10) + "Click to display next time.";
			t = new Date(2000, 1, 1, 12, 0);
			noLoop();
			settings.minuteSwitchIntervall = 0;
			break;

		case modeAutoTest:
			hint = ""
			t = new Date(2000, 1, 1, 12, 0);
			loop();
			settings.minuteSwitchIntervall = 0;
			break;

		case modeEffectTest:
			hint = ""
			noLoop();
			settings.minuteSwitchIntervall = 1;
			timeDiplayer.minuteSwitcher.isMinuteSwitchTest = true;
			break;
	}

	hint = hint + (hint.length > 0 ? char(10) : "") + "Double click to toggle full screen mode."
	draw();
}