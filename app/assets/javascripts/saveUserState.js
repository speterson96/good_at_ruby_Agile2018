
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
      url: "/sendSaveState",
      type: "get",
      data: {
        user_lives : lives, 
        user_bullets : bullets, 
        user_score : score, 
        user_difficulty : difficulty
      },
      success: function(){
        console.log('Saved Successfully :)');
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
        console.log('Saved Successfully :)');
      },
       error: function(xhr,status,error){
         console.log(xhr);
         alert(error); 
      }
    });
		 
  },
  
  startGameFromSave : function(lives, bullets, score, difficulty){   
    window.location.href = "/game";
    //gameStart(lives, bullets, score, difficulty);
    // Once merged with master this function will work
    // may need a name change but thats all.
  }
  
}
   
   
$(function(){
  
  var saves = document.querySelectorAll(".saveSlot");
  
  for(var i = 0; i < saves.length; i++){
    saves[i].addEventListener("click", function(){

      var score, bullets, lives, difficulty;     
        score = $(this).children(".score").text();
        lives = $(this).children(".lives").text();
        bullets = $(this).children(".bullets").text();
        difficulty = $(this).children(".difficulty").text();
      
     saveUserState.startGameFromSave(lives, bullets, score, difficulty);
      
    }, false);
}
  
})

   
  







