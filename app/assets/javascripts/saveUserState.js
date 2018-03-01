
var saveUserState =  {
	
	userLives : 0,
	userBullets : 0,
	userScore : 0,
	userDifficulty : 'normal',
		
	init : function(lives, bullets, score, difficulty){
		this.userLives = lives;
		this.userBullets = bullets;
		this.userScore = score;
		this.difficulty = difficulty;
	},
	
	 sendUserSaveState : function(lives, bullets, score, difficulty) {
		 
		$.ajax({
      url: "/",
      type: "get",
      data: {
        user_lives : lives, 
        user_bullets : bullets, 
        user_score : score, 
        user_difficulty : difficulty
      },
      success: function(){
        alert('Saved Successfully :)');
      },
       error: function(xhr,status,error){
         console.log(xhr);
         alert(error);
      }
    });
		 
	 },
	
	sendUserScore : function(score) {
		 
		$.ajax({
      url: "/sendScores",
      type: "get",
      data: {user_score: score},
      success: function(){
        alert('Saved Successfully :)');
      },
       error: function(xhr,status,error){
         console.log(xhr);
         alert(error); 
      }
    });
		 
  }

} 
