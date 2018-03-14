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
     		 
    if(confirm("Are you sure you want to load this save?")){
      window.location="/game?score=" + score + "&bullets=" + bullets + "&lives=" + lives + "&diff=" + difficulty + "&save=t" ;
    }
  },
  
  
  startGame : function() {
      
    if (saveUserState.parseQuery(location.search).save !== 't'){
            
             game(3, 3, 0, 'normal'); //These values are the defaults for lauching the game.
             
    } else {
      
        game(saveUserState.parseQuery(location.search).lives, 
             saveUserState.parseQuery(location.search).bullets, 
             saveUserState.parseQuery(location.search).score, 
             saveUserState.parseQuery(location.search).diff);
        
    }
    
    document.querySelector('.startGame').style.display="none";
    document.querySelector('.gameWrapper').style.display="block"; 
          
  },
  
  parseQuery: function(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
      
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        
    }
    
    return query;
    
  }
}; //=== End of saveUserState Object // ======= Start Helper Functions
   
$(function(){

  var saves = document.querySelectorAll(".saveSlot");
  
  for(var i = 0; i < saves.length; i++){
    saves[i].addEventListener("click", function(){

      var score, bullets, lives, difficulty; 
        score = $(this).children(".score").text();
        lives = $(this).children("._lives").text();
        bullets = $(this).children(".bullets").text();
        difficulty = $(this).children(".difficulty").text();
        
     saveUserState.startGameFromSave(lives, bullets, score, difficulty);
   
    }, false);
}
});;

   
  







