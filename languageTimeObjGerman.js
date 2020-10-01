class LanguageTimeObjGerman extends LanguageTimeObj {
	constructor () {
		super();

		this.matrix = [
		  // 01234567890
			"ES IST FÜNF",
			"ZEHNZWANZIG",
			"DREIVIERTEL",
			"VOR    NACH",
			"HALB ELFÜNF",
			"EINS   ZWEI",
			"DREI   VIER",
			"SECHS  ACHT",
			"SIEBENZWÖLF",
			"ZEHNEUN UHR",
		];
		this.fillMatrixGaps();
		this.itIs = [new word(0, 0, 2), new word(0, 3, 3)];
		this.before = [new word(3, 0, 3)]; 
		this.after  = [new word(3, 7, 4)]; 
		this.half  = [new word(4, 0, 4)]; 
		this.oclock = [new word(9, 8, 3)]; 
		this.minuteWords = [
			[new word(0, 7, 4)],	// Fünf (nach)
			[new word(1, 0, 4)],	// Zehn  
			[new word(2, 4, 7)],	// Viertel
			[new word(1, 4, 7)],	// Zwanzig
			[new word(0, 7, 4)],	// Fünf (vor halb)
			[new word(0, 0, 0)],	// Halb (half is reduntant defined for simplicity of code) 
			[new word(0, 7, 4)],	// Fünf (nach halb)
			[new word(1, 4, 7)],	// Zwanzig (vor)
			[new word(2, 4, 7)],	// Viertel
			[new word(1, 0, 4)],	// Zehn  
			[new word(0, 7, 4)],	// Fünf 
		];
		this.hourWords = [
			[new word(8, 6, 5)],	// 12 at top (index=0)
			[new word(5, 0, 4)],	// 1
			[new word(5, 7, 4)], 	// 2
			[new word(6, 0, 4)], 	// 3
			[new word(6, 7, 4)],  	// 4
			[new word(4, 7, 4)],  	// 5
			[new word(7, 0, 5)],  	// 6
			[new word(8, 0, 6)],  	// 7
			[new word(7, 7, 4)],  	// 8
			[new word(9, 3, 4)],  	// 9
			[new word(9, 0, 4)],  	// 10
			[new word(4, 5, 3)] 	// 11
		];
	}

	getWordsForTime(h, m) {
		// The grammar to create the corrent wording for a given time
		// returns an array of words (row, col, len) to be displayed
		let wordArr = [];
		wordArr = wordArr.concat(this.itIs);
		if (m >= 5) { 
			var mIndex = Math.floor(m / 5) - 1;
			wordArr = wordArr.concat(this.minuteWords[mIndex]);	

			if (m < 25)
				 wordArr = wordArr.concat(this.after);
			else if (m < 30) 
				 wordArr = wordArr.concat(this.before);
			else if (m >= 35 && m < 40)
				 wordArr = wordArr.concat(this.after);
			else if (m >= 40)
				 wordArr = wordArr.concat(this.before);
			if (m >= 25 && m <  40) wordArr = wordArr.concat(this.half);
			
		}
		var hIndex = h;
		if (m < 25) 
			hIndex = h % 12;
		else
			hIndex = (h + 1) % 12;
		
		wordArr = wordArr.concat(this.hourWords[hIndex]);
		
		if (m < 5)
			wordArr = wordArr.concat(this.oclock); 
		return wordArr;
	}
	
	fillMatrixGaps(fillword) {
		if (fillword === undefined) fillword = "";
		let gapCount = 0;
		for (let i=0; i<this.matrix.length; i++) {
			let word = "";
			for (let j=0; j<this.matrix[i].length; j++) {
				let c = this.matrix[i].substring(j, j+1);
				if (c == " ") {
					c = (gapCount < fillword.length 
					             ? fillword.substr(gapCount, gapCount+1) 
					             : String.fromCharCode(65+Math.floor(Math.random() * 26)));
					gapCount++;
				}
				word = word + c;
			}
			this.matrix[i] = word;
		}
	}
}
