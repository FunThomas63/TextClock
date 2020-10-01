function TimeDisplayer(_languageTimeObj)
{
	this.languageTimeObj  = _languageTimeObj;
	this.borderTop = height / 10;
	this.borderLeft = width / 10;

	var s = this.languageTimeObj.matrix[0];
	// Size of a Character-Rect
	this.boxW = (width - (2 * this.borderLeft)) / s.length;
	this.boxH = (height - (2 * this.borderTop)) / this.languageTimeObj.matrix.length;

	this.minuteSwitcher = new MinuteSwitcher(s.length, this.languageTimeObj.matrix.length);		// ToDo: umbenennen in effect
	this.minuteSwitchIntervall = 1;	// All 1 minutes 

	this.displayTime = function(_t)
	{
		this.t = _t;
		if (_t == undefined) t = new Date();
		var hour = t.getHours();
		var minute = t.getMinutes();
		var second = t.getSeconds();
		var wordArr = this.languageTimeObj.getWordsForTime(hour, minute);
		
		if (settings.minuteSwitchIntervall > 0 && second == 0 && minute % this.minuteSwitcher.minuteSwitchIntervall() == 0)
			this.minuteSwitcher.activate();
		
		this.drawTime(wordArr, hour, minute, second);
		this.minuteSwitcher.progress();
	}
	
	this.drawTime = function(wordArr, hour, minute, second)
	{
		fill(settings.backColor);
		rect(0, 0, width, height);
		
		let textColor = settings.textColor;
		
		var ts = Math.floor(Math.min(this.boxW, this.boxH) * settings.textSize);
		// console.log(ts);
		textSize(ts);
		textFont(settings.font);
		textAlign(CENTER, CENTER);
		
		// Draw all characters, but very dimmed
		for (var i=0; i < this.languageTimeObj.matrix.length; i++)
		{
			var y = Math.floor(this.borderTop + (i + 0.5) * this.boxH);
			for (j=0; j < this.languageTimeObj.matrix[i].length; j++)
			{
				var x = Math.floor(this.borderLeft + (j + 0.5) * this.boxW);
				var chr = this.languageTimeObj.matrix[i].substr(j, 1);
	
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
			for (var i=0; i<wordArr.length; i++)
			{
				var word = wordArr[i];
				for (j=0; j<word.l; j++)
				{
					var chr = this.languageTimeObj.matrix[word.r].substr(word.c+j, 1);
					var x = Math.floor(this.borderLeft + (word.c + j + 0.5) * this.boxW);
					var y = Math.floor(this.borderTop + (word.r + 0.5) * this.boxH);
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
				let x = (m % 2 == 1 ? settings.minuteCirclePos : width - settings.minuteCirclePos);
				let y = (m < 3 ? settings.minuteCirclePos : height - settings.minuteCirclePos);
				
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
			let x = width/2;
			let y = settings.digitalPosTop ? settings.digitalPos : height - settings.digitalPos;
			let tStr = (hour < 10 ? "0" : "") + hour + ":" + (minute < 10 ? "0" : "") + minute + ":" + (second < 10 ? "0" : "") + second;
			
			textSize(Math.floor(Math.min(this.boxW, this.boxH) * settings.digitalTextSize));
			if (settings.useShadow) {
				fill(settings.shadowColorNormalText);
				text(tStr, x+settings.shadowDelta, y+settings.shadowDelta);
			}
			fill(settings.digitalTextColor >= 0 ? settings.digitalTextColor : settings.getNormalTextColor(minute));
			text(tStr, x, y);
		}
	}
}
