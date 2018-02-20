class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :user_id
      t.integer :score

      t.timestamps null: false

    end
    add_foreign_key :scores, :users
  end
end
