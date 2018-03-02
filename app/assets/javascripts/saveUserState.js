
var saveUserState =  {
	
	userLives : 0,
	userBullets : 0,
	userScore : 0,
	userDifficulty : 'hard',
		
	init : function(lives, bullets, score, difficulty){
		this.userLives = lives;
		this.userBullets = bullets;
		this.userScore = score;
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
         //alert(error); Dont know what the problem is yet
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
         alert(error); //Dont know what the problem is yet
      }
    });
		 
  }

} 
