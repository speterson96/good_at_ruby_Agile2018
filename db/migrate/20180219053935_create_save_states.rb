class CreateSaveStates < ActiveRecord::Migration
  def change
    create_table :save_states do |t|
      t.integer :user_id
      t.integer :bullets
      t.integer :lives
      t.integer :score
      t.string :difficulty
    end
  end
end