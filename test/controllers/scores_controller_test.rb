require './test/test_helper'

class ScoresControllerTest < ActionController::TestCase

  test "should send score" do
     assert_recognizes({:controller => 'scores', :action => 'create'}, {:path => 'sendScores', :method => :get})
     #get "/sendScores", controller: 'scores', action: 'create' -- Route path its looking for
  end
  
end
