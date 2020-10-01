class LanguageTimeObjPlatt extends LanguageTimeObj {
	constructor () {
		super();
		
// https://lern-platt.de/zaehlen-op-platt-die-zahlen-von-1-bis-10/
// https://sass-platt.de/plattdeutsche-grammatik/2-6-1-5-Zahlen-bei-der-Uhrzeit.html
// 1 – een, 2 – twee, 3 – dree, 4 – veer, 5 – fief, 6 – söss, 7 – söven, 8 – acht, 9 – negen, 10 – teihn, 11 - ölven, 12 - twölf, 20 - twintig
		this.matrix = [
		  // 01234567890
			"Dat is fief",  // 0
			"teihn clock",  // 1
			"Veertel    ",  // 2
			"twintig för",  // 3
			"na half een",  // 4
			"dree   veer",  // 5
			"fief  söven",  // 6
			"sössachtwee",  // 7
			"negen teihn",  // 8
			"ölven twölf",  // 9
  		  // 01234567890
		  ];
		
		// fünf vor halb drei
		
		this.fillMatrixGaps();
		
		this.itIs   = [new word(0, 0, 3), new word(0, 4, 2)];
		this.before = [new word(3, 8, 3)]; 
		this.after  = [new word(4, 0, 2)]; 
		this.half   = [new word(4, 3, 4)];  
		this.oclock = [new word(1, 6, 5)]; 	// Just for the full hour
		
		this.minuteWords = [
			[new word(0, 7, 4)],	// Fünf (nach)
			[new word(1, 0, 5)],	// Zehn  
			[new word(2, 0, 7)],	// Viertel (nach)
			[new word(3, 0, 7)],	// Zwanzig
			[new word(0, 7, 4)],	// Fünf (vor halb)
			[new word(0, 0, 0)],	// Halb (half is reduntant defined for simplicity of code)
			[new word(0, 7, 4)],	// Fünf (nach halb)
			[new word(3, 0, 7)],	// Zwanzig (vor)
			[new word(2, 0, 7)],	// Viertel (vor)
			[new word(1, 0, 5)],	// Zehn (vor)
			[new word(0, 7, 4)],	// Fünf (vor)
		];
		this.hourWords = [
			[new word(9, 6, 5)],	// 12 at top (index=0)
			[new word(4, 8, 3)],	// 1
			[new word(7, 7, 4)], 	// 2
			[new word(5, 0, 4)], 	// 3
			[new word(5, 7, 4)],  	// 4
			[new word(6, 0, 4)],  	// 5
			[new word(7, 0, 4)],  	// 6
			[new word(6, 6, 5)],  	// 7
			[new word(7, 4, 4)],  	// 8
			[new word(8, 0, 5)],  	// 9
			[new word(8, 6, 5)],  	// 10
			[new word(9, 0, 5)] 	// 11
		];
	}

	getWordsForTime(h, m) {
		// The grammar to create the corrent wording for a given time		
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
