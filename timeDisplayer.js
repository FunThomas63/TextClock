class TimeDisplayer {
    constructor(_languageTimeObj) {
		this.languageTimeObj  = _languageTimeObj;
		var s = this.languageTimeObj.matrix[0];
		this.minuteSwitcher = new MinuteSwitcher(s.length, this.languageTimeObj.matrix.length);		// ToDo: umbenennen in effect
		this.setSize();
	}
	
	setSize() {
		this.clockSize = Math.min(width, height);
		this.borderTop = this.clockSize / 10;
		this.borderLeft = this.clockSize / 10;	

		// Size of a Character-Rect
		this.boxW = (this.clockSize - (2 * this.borderLeft)) / this.languageTimeObj.matrix[0].length;
		this.boxH = (this.clockSize - (2 * this.borderTop)) / this.languageTimeObj.matrix.length;
	}

	displayTime(_t)
	{
		this.t = _t;
		if (_t == undefined) t = new Date();
		var hour = t.getHours();
		var minute = t.getMinutes();
		var second = t.getSeconds();
		var wordArr = this.languageTimeObj.getWordsForTime(hour, minute);
		
		if (settings.minuteSwitchIntervall > 0 && second == 0 && minute % settings.minuteSwitchIntervall == 0)
			this.minuteSwitcher.activate();
		
		this.drawTime(wordArr, hour, minute, second);
		this.minuteSwitcher.progress();
	}
	
	drawTime(wordArr, hour, minute, second)
	{
		fill(settings.backColor);
		rect(0, 0, width, height);
		
		push();
		translate((width - this.clockSize) / 2, (height - this.clockSize) / 2);
		fill(settings.clockColor);
		rect(0, 0, this.clockSize, this.clockSize);
		
		let textColor = settings.textColor;
		
		let ts = Math.floor(Math.min(this.boxW, this.boxH) * settings.textSize);
		// console.log(ts);
		textSize(ts);
		textFont(settings.font);
		textAlign(CENTER, CENTER);
		
		// Draw all characters, but very dimmed
		for (let i=0; i < this.languageTimeObj.matrix.length; i++)
		{
			let y = Math.floor(this.borderTop + (i + 0.5) * this.boxH);
			for (let j=0; j < this.languageTimeObj.matrix[i].length; j++)
			{
				let x = Math.floor(this.borderLeft + (j + 0.5) * this.boxW);
				let chr = this.languageTimeObj.matrix[i].substr(j, 1);
				if (settings.useUpper) chr = chr.toUpperCase();
	
				if (settings.useShadow)
				{
					fill(settings.shadowColorDimmedText);
					text(chr, x+settings.shadowDelta, y+settings.shadowDelta);
				}

				if (this.minuteSwitcher.isActive()) 
					this.minuteSwitcher.setColor(j, i);
				else
					fill(settings.dimmedTextColor);
				text(chr, x, y);
			}	
		}	
		
		// Draw words that show the time in brighter color
		if (!this.minuteSwitcher.isActive())
		{
			// Draw the words 
			fill(settings.normalTextColor);
			for (let i=0; i<wordArr.length; i++)
			{
				let word = wordArr[i];
				for (let j=0; j<word.l; j++)
				{
					let chr = this.languageTimeObj.matrix[word.r].substr(word.c+j, 1);
					if (settings.useUpper) chr = chr.toUpperCase();
					let x = Math.floor(this.borderLeft + (word.c + j + 0.5) * this.boxW);
					let y = Math.floor(this.borderTop + (word.r + 0.5) * this.boxH);
					if (settings.useShadow)
					{
						fill(settings.shadowColorNormalText);
						text(chr, x+settings.shadowDelta, y+settings.shadowDelta);
					}
					fill(settings.getNormalTextColor(minute));
					text(chr, x, y);				
				}
			}
		}
		

		// minute-circles
		if (settings.showMinuteCircles) {
			noStroke();
			let minuteCircles = (minute % 5);

			for (let m=1; m<=4; m++) {
				let x = (m % 2 == 1 ? settings.minuteCirclePos : this.clockSize - settings.minuteCirclePos);
				let y = (m < 3 ? settings.minuteCirclePos : this.clockSize - settings.minuteCirclePos);
				
				if (settings.useShadow) {
					fill(minuteCircles >= m ? settings.shadowColorNormalText : settings.shadowColorDimmedText);
					ellipse(x+settings.shadowDelta, y+settings.shadowDelta, settings.minuteCircleSize);
				}
				fill(minuteCircles >= m ? settings.getNormalTextColor(minute) : settings.dimmedTextColor);
				ellipse(x, y, settings.minuteCircleSize);
			}
		}
		
		if (settings.showDigital) {			
			// Display time in form HH:MM
			let x = this.clockSize/2;
			let y = settings.digitalPosTop ? settings.digitalPos : this.clockSize - settings.digitalPos;
			let tStr = (hour < 10 ? "0" : "") + hour + ":" + (minute < 10 ? "0" : "") + minute + ":" + (second < 10 ? "0" : "") + second;
			
			textSize(Math.floor(Math.min(this.boxW, this.boxH) * settings.digitalTextSize));
			if (settings.useShadow) {
				fill(settings.shadowColorNormalText);
				text(tStr, x+settings.shadowDelta, y+settings.shadowDelta);
			}
			fill(settings.digitalTextColor >= 0 ? settings.digitalTextColor : settings.getNormalTextColor(minute));
			text(tStr, x, y);
		}
		pop();
	}
}
