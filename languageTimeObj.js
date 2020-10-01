class word	{
	constructor(_r, _c, _l)	{
		this.name = "platt"
		this.r = _r;
		this.c = _c;
		this.l = _l;
	}
}

// Base class, derive all language specific classes from here.
// Needs to expose 
//   - the matrix (10 rows / 11 columns) 
//   - getWordsForTime(h, m)
// everything else is up to the class.

class LanguageTimeObj {
	constructor () {
		this.matrix = [
		  // 01234567890
			"           ",
			"     I     ",
			"           ",
			"    AM     ",
			"           ",
			"     A     ",
			"           ",
			"   TEST    ",
			"           ",
			"           ",
		];
		this.fillMatrixGaps();  // fills spaces with random characters
		
		this.itIs = [new word(1, 5, 2), new word(3, 4, 2), new word(5, 5, 1), new word(7, 3, 4)];
		this.before = [new word(0, 0, 0)]; 
		this.after  = [new word(0, 0, 0)]; 
		this.half  = [new word(0, 0, 0)]; 
		this.oclock = [new word(0, 0, 0)]; 
		this.minuteWords = [
			[new word(0, 0, 0)],	// Fünf (nach)
			[new word(0, 0, 0)],	// Zehn  
			[new word(0, 0, 0)],	// Viertel
			[new word(0, 0, 0)],	// Zwanzig
			[new word(0, 0, 0)],	// Fünf (vor halb)
			[new word(0, 0, 0)],	// Halb
			[new word(0, 0, 0)],	// Fünf (nach halb)
			[new word(0, 0, 0)],	// Zwanzig (vor)
			[new word(0, 0, 0)],	// Viertel
			[new word(0, 0, 0)],	// Zehn  
			[new word(0, 0, 0)],	// Fünf 
		];
		this.hourWords = [
			[new word(0, 0, 0)],	// 12 at top (index=0)
			[new word(0, 0, 0)],	// 1
			[new word(0, 0, 0)], 	// 2
			[new word(0, 0, 0)], 	// 3
			[new word(0, 0, 0)],  	// 4
			[new word(0, 0, 0)],  	// 5
			[new word(0, 0, 0)],  	// 6
			[new word(0, 0, 0)],  	// 7
			[new word(0, 0, 0)],  	// 8
			[new word(0, 0, 0)],  	// 9
			[new word(0, 0, 0)],  	// 10
			[new word(0, 0, 0)] 	// 11
		];
	}

	getWordsForTime(h, m) {
		// The grammar to create the corrent wording for a given time
		// returns an array of words (row, col, len) to be displayed
		// this example is from german 
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
