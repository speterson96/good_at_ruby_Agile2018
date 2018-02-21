class CreateSaveStates < ActiveRecord::Migration
  def change
    create_table :save_states do |t|
      t.integer :bullets
      t.integer :lives
      t.integer :score
      t.string :difficulty
    end
    add_foreign_key :save_states, :users
  end
end