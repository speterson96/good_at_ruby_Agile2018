class SaveStateController < ApplicationController
  
  def set_title
    
  end

  # GET /scores
  # GET /scores.json
  def index
    
  end
  
  def create
    userDiff = params[:user_difficulty]   
    userScore = params[:user_score]
    userBullets = params[:user_bullets]
    userLives = params[:user_lives]
    @save_state = SaveState.create(
      user_id: session[:user_id], 
      score: userScore,
      difficulty: userDiff,
      bullets: userBullets,
      lives: userLives
      )
    if @save_state.save
      respond_to do |format|
         format.html {redirect_to root_path}
      end 
    end
  end
  
  
end
