class HomeController < ApplicationController
  before_action :set_title
  before_action :index 
  
  def set_title
    @title = "Game"
  end

end
