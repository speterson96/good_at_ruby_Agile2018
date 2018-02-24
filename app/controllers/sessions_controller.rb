class SessionsController < ApplicationController

  def create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    session[:user_id] = @user.id
    redirect_to root_url 

  end 

  def destroy
    session[:user_id] = nil
    session[:omniauth] = nil
    redirect_to root_url, notice: "SIGNED OUT"
  end
    
  def failure
    redirect_to root_url, :alert => "Authentication error: #{params[:message].humanize}"
  end

  def auth_hash
    request.env['omniauth.auth']
  end
end
