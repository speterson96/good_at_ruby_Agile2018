require './test/test_helper'

class ScoresControllerTest < ActionController::TestCase

  test "should send save" do
    assert_recognizes({:controller => 'save_state', :action => 'create'}, {:path => 'sendSaveState', :method => :get})
     #get "/sendSaveState", controller: 'save_state', action: 'create' -- Route path its looking for
  end
  
end
