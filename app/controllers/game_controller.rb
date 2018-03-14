class GameController < ApplicationController
  before_action :set_title
  before_action :index 
  
  def index   
    
  end
  
  def set_title
    @title = "Game"
  end

end
