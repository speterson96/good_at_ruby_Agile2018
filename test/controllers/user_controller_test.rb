require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  setup do
    @user = user(:one)
  end
  
  test 'redirect to root if signed out' do
    get user_url
    assert_redirect_to root_url
  end
  
  test 'should show user' do
    sign_in_as @user
    get user_url
    assert_response :success
  end
  
  test 'should not be viewable after signout' do
    sign_in-as @user
    get user_url
    assert_response :success
    sign_out
    assert_redirected_to root_url
  end
  
end