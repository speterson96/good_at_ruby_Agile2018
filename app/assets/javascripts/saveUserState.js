
var saveUserState =  {
	
	userLives : 0,
	userBullets : 0,
	userScore : 0,
	userDifficulty : 'hard',
		
	init : function(lives, bullets, score, difficulty){
		this.userLives : lives;
		this.userBullets : bullets;
		this.userScore : score;
	}
	
	 sendUserScore : function(lives, bullets, score) {
		 
		 // Work magic here.
		 
	 }
	
	// Example
	// saveUserState.int(3, 5, 2500, "hard");
	// saveUserState.sendUserScore();
} 