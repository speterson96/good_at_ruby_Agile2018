class ScoresController < ApplicationController
  before_action :set_title
  before_action :index 
  
  def set_title
    @title = "Scores"
  end

  # GET /scores
  # GET /scores.json
  def index
    @scores = Score.all 
  end
  
  def create
    userScore = params[:user_score]
    @scores = Score.create(user_id: session[:user_id], score: userScore)
    if @scores.save
      respond_to do |format|
         format.html {redirect_to root_path}
      end 
    end
  end
  
  
end
