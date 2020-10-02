class Settings
{
	constructor() {
		this.font = "Verdana";

		this.backColor = color(240);
		this.clockColor = color(220);
		
		this.dimmedTextColor = color(225);
		this.normalTextColor = [];
		this.fillNormalTextColorArray(color(0, 160, 220));
		this.useRandomTextColor = true;
		this.textSize = 0.85;
		this.useUpper = true;
			
		this.useShadow = true;
		this.shadowColorNormalText = color(220);
		this.shadowColorDimmedText = color(200);
		this.shadowDelta = -1;

		this.showMinuteCircles = true;
		this.minuteCircleSize = 12;
		this.minuteCirclePos = 30;
		
		this.showDigital = true;
		this.digitalPosTop = false;
		this.digitalPos = 20;
		this.digitalTextColor = -1;
		this.digitalTextSize = 0.4;
		
		this.minuteSwitchIntervall = 1;
	}
	
	fillNormalTextColorArray(defColor) {
		this.normalTextColor.push(defColor);
		for (let i=1; i<60; i++) {
			
			let r = random(64, 192);
			let g = random(64, 192);
			let b = random(64, 192);
			this.normalTextColor.push(color(r, g, b));
		}
	}
	
	getNormalTextColor(minute) {
		return this.normalTextColor[this.useRandomTextColor ? minute : 0];
	}
	
}