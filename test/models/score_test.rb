require 'test_helper'

class ScoreTest < ActiveSupport::TestCase
  test "creates a valid score" do
    score = Score.new
    score.user_id = 1
    score.score = 100
    assert score.save
  end
end

