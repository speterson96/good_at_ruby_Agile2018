require './test/test_helper'

class GameControllerTest < ActionController::TestCase

  test "should send score" do
  conrtoller = game_controller.new 
    assert_equal 1000, controller.sendScore
  end
  
end
