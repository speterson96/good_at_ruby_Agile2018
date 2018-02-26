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
    @scores = Score.create(user_id: 1, score: userScore)
    if @scores.save
      respond_to do |format|
          format.html { redirect_to @scores, notice: 'Score sent successfully' }
          format.json { render :new, status: :created, location: @scores }
      end
   end
  end
  
end
