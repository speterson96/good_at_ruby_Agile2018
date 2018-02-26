require './test/test_helper'

class ScoresControllerTest < ActionController::TestCase

  test "should send score" do
  controller = scores_controller.new 
    assert_that  controller.create
  end
  
end
