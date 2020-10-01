function MinuteSwitcher(sizeX, sizeY)
{
	this.steps = 8;  // <steps> steps from grey to MaxColor (and back to grey)
	this.delta = 5;	 // next diagonal "follows" after <delta> ticks
	this.brightnessFactor = 100 / this.steps;
	this.isMinuteSwitchTest = false;
	
	this.diagonalCount = sizeX + sizeY - 1;
	if (!this.isTest)
		this.duration = (this.steps * 2 - 1) + ((this.diagonalCount-1) * this.delta) + 1;
	this.ticks = -1;
	
	this.activate = function()
	{
		this.ticks = 0;
		if (!this.isMinuteSwitchTest)
			frameRate(this.duration);		// Let it run in 1 second
	}
	
	this.isActive = function()
	{		
		return(this.ticks >= 0);
	}

	this.progress = function()
	{
		if (!this.isActive()) return;

		this.ticks++;
		if (this.ticks > this.duration)
		{
			this.ticks = -1;
			if (!this.isMinuteSwitchTest)
			{
				frameRate(1);		// No need to hurry when it's over
				draw();
			}
		}
	}

	this.setColor = function(x, y)
	{
		let diagonal = x + y;
		
		let peak = (diagonal * this.delta) + (this.steps - 1);
		let sat = 100 - (abs(this.ticks - peak) * this.brightnessFactor);
		// console.log(this.ticks + " " + diagonal + " " + brightnessValue);
		if (sat < 0 || ! this.isActive()) 
		{
			fill(220);
		} 
		else 
		{	
			colorMode(HSB);
			let hue = map(diagonal, 0, this.diagonalCount-1, 0, 360);
			let bri = map(sat, 0, 100, 86, 100)
			fill(hue, sat, bri);
			colorMode(RGB);
		}
	}

	
}