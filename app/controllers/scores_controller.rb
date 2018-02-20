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
end
