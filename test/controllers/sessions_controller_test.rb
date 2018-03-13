require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'sign in should redirect to root url' do
   user = users(:one)
   post '/auth/developer/callback', params: {name: user.name, provier: user.provider}
   assert_not_nil @response.cookies[rails.application.config.session_options[:key]]
   assert_equal user.id, session[:current_user_id]
   assert_redirected_to_root_url
   
end