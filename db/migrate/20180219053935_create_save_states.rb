class CreateSaveStates < ActiveRecord::Migration
  def change
    create_table :save_states do |t|
      t.integer :save_id # May not need this line
      t.integer :user_id  # Or this one
      t.integer :bullets
      t.integer :lives
      t.integer :score
      t.string :difficulty
    end
    add_index :save_states, :save_id
    add_foreign_key :save_states, :users
  end
end