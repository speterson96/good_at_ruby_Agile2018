class GameController < ApplicationController
  before_action :set_title
  before_action :index 
  
  def index     
  end
  
  def set_title
    @title = "Game"
  end

  def start_game
    diff = params[:user_difficulty]   
    score = params[:user_score]
    bullets = params[:user_bullets]
    lives = params[:user_lives]
    respond_to do |format|
      format.html {redirect_to :action =>'game', :lives => lives, :bullets => bullets, :score => score, :diff => diff}
      #format.js {render :js => "game(10,10,10,'hard');" }
    end
    
  end


end
